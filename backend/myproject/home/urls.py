# myproject/home/urls.py

from django.urls import path
from . import views

urlpatterns = [
    
    # #report generation
    path('pdf-report/', views.generate_pdf_report, name='generate_pdf_report'),
    path("get_progress_nist/<uuid:job_id>/", views.get_progress_nist, name="get_progress_nist"),
    
    path('pdf-report-nist90b/', views.generate_pdf_report_nist90b, name='generate_pdf_report'),
    path("get_progress_nist90b/<uuid:job_id>/", views.get_progress_nist90b, name="get_progress_nist90b"),
    
    path('pdf-report-dieharder/', views.generate_pdf_report_dieharder1, name='generate_pdf_report_dieharder'),
    path("get_progress_ReportDieharder/<uuid:job_id>/", views.get_progress_ReportDieharder, name="get_progress_ReportDieharder"),
    
    path('pdf-report-server/', views.generate_pdf_report_server, name='generate_pdf_report_server'),
    path("get_progress_server/<uuid:job_id>/", views.get_progress_server, name="get_progress_server"),
    
    # #graph generation
    path('graph-generation/', views.create_graph, name='create_graph'),
    path("get_progress_graph/<uuid:job_id>/", views.get_progress_graph, name="get_progress_graph"),
    
    path('graph-generation-nist90b/', views.create_graph_nist90b, name='create_graph_nist90b'),
    path('get_progress_graph90b/<uuid:job_id>', views.get_progress_graph90b, name='get_progress_graph90b'),
    
    path('graph-generaion-dieharder/', views.create_graph_dieharder, name='create_graph_dieharder'),
    path('get_progress_graphDieharder/<uuid:job_id>/', views.get_progress_graphDieharder, name='get_progress_graphDieharder'),
    
    # final ans
    path('generate_final_ans/', views.generate_final_ans, name='generate_final_ans'),
    # path('generate_final_ans1/', views.generate_final_ans1, name='generate_final_ans1'),
    path("get_progress/<uuid:job_id>/", views.get_progress, name="get_progress"),
    
    path('generate_final_ans_nist90b/', views.generate_final_ans_nist90b, name='generate_final_ans_nist90b'),
    path("get_progress90b/<uuid:job_id>/", views.get_progress90b, name="get_progress90b"),


    path('run_nist/', views.run_nist_tests, name='run_nist_tests'),
    path('aggregate-stats/', views.aggregate_stats, name='aggregate_stats'),
    path("nist90b_run/", views.run_nist90b_on_bin, name="nist90b_run"),

    path('task_tatus/<str:task_id>/', views.check_task_status, name='check_task_status'),
    path('job_tatus/<str:job_id>/', views.check_job_status, name='check_job_status'),

    path('download_nist90b/', views.download_nist90b_output, name='download_nist90b_output'),
    path('download_nist22b/', views.aggregate_stats, name='download_nist22b_output'),

    path('generate_final_ans_dieharder/', views.generate_final_ans_dieharder, name='generate_final_ans_dieharder'),
    path("get_progress_dieharder/<int:line_number>/", views.get_progress_dieharder, name="get_progress_dieharder"),
    path("get_output_dieharder/<int:line_number>/", views.get_output_dieharder, name="get_output_dieharder"),

   path('fetch-qrng/', views.fetch_qrng, name='fetch-qrng'),
]
