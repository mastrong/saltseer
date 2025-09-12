import os


if os.getenv('ENVIRONMENT') == 'production':
    from .prod import *
else:
    from .dev import *