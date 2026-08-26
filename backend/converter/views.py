from __future__ import annotations

import json
import tempfile
from pathlib import Path

from django.http import FileResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET

from .processors import ProcessingError, SUPPORTED_TOOLS, process
from .security import UploadRejected, save_and_validate_uploads

def _error(message: str, status: int) -> JsonResponse:
    response = JsonResponse({"ok": False, "error": message}, status=status)
    response["Cache-Control"] = "no-store"
    return response

@require_GET
def health(_request):
    return JsonResponse({"ok": True, "service": "siaq-converter", "supported_tools": sorted(SUPPORTED_TOOLS)})

@csrf_exempt
def process_tool(request, tool_slug: str):
    if request.method != "POST": return _error("استخدم طلب POST لمعالجة الملفات.", 405)
    if tool_slug not in SUPPORTED_TOOLS: return _error("هذه الأداة غير مفعّلة بعد.", 404)
    try:
        options = json.loads(request.POST.get("options", "{}"))
        if not isinstance(options, dict): raise ValueError
    except (json.JSONDecodeError, ValueError):
        return _error("إعدادات الطلب غير صحيحة.", 400)

    workspace = tempfile.TemporaryDirectory(prefix="siaq-")
    workdir = Path(workspace.name)
    try:
        paths = save_and_validate_uploads(tool_slug, request.FILES.getlist("files"), workdir)
        result = process(tool_slug, paths, options, workdir)
        response = FileResponse(result.path.open("rb"), content_type=result.content_type, as_attachment=True, filename=result.filename)
        response["Cache-Control"] = "no-store, private"
        response["X-Content-Type-Options"] = "nosniff"
        response._resource_closers.append(workspace.cleanup)
        return response
    except UploadRejected as exc:
        workspace.cleanup(); return _error(str(exc), 400)
    except ProcessingError as exc:
        workspace.cleanup(); return _error(str(exc), 422)
    except Exception:
        workspace.cleanup(); return _error("حدث خطأ غير متوقع أثناء المعالجة.", 500)

