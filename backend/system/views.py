from django.db import connections
from django.db.utils import OperationalError
from django.http import JsonResponse


def health_check(request):
    # Initialize status as 'healthy'
    status = 'healthy'
    try:
        # Check database connection
        connection = connections['default']
        connection.cursor()
    except OperationalError:
        status = 'unhealthy'

    # Return the result json document
    return JsonResponse({
        'database': status,
        'status': status,
    }, status=(200 if status == 'healthy' else 500))
