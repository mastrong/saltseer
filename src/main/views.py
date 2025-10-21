from django.shortcuts import render


def dashboard(request):
    return render(request, 'dashboard.html', {"show_aside": True})

def reports(request):
    return render(request, 'reports.html')