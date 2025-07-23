# myproject/home/urls.py

from django.urls import path
from . import views
# from .views import sse_binary_view,sse_binary_example_view
from .views import DieharderMinDistTestView
from .views import DieharderBirthdayTestView
from .views import DieharderOperm5TestView
from .views import DieharderParkingLotTestView
from .views import DieharderSqueezeTestView
from .views import DieharderCountOneTestView
from .views import DieharderCountOneStreamTestView
from .views import DieharderOQSOTestView
from .views import DieharderDnaTestView
from .views import DieharderOPSOTestView
from .views import DieharderBitstreamTestView
from .views import Dieharder6x8RankTestView
from .views import DieharderTsangTestView
from .views import DieharderTsangTestView
from .views import DieharderCrapsTestView
from .views import DieharderStsRunsTestView
from .views import DieharderStsMonoTestView
from .views import DieharderLaggedTestView
from .views import DieharderxTestView
from .views import Dieharder32RankTestView

urlpatterns = [
    # nist sp 800-22
    path('run_frequency_test/', views.run_frequency_test, name='run_frequency_test'),
    path('run_frequency_block_test/', views.run_frequency_block_test, name='run_frequency_block_test'),
    path('run_runs_test/', views.run_runs_test, name='run_runs_test'),
    path('run_longest_one_block_test/', views.run_longest_one_block_test, name='run_longest_one_block_test'),
    path('run_approximate_entropy_test/',views.run_approximate_entropy_test, name='run_approximate_entropy_test'),
    path('run_linear_complexity_test/',views.run_linear_complexity_test, name='run_linear_test'),
    path('run_non_overlapping_test/',views.run_non_overlapping_test, name='run_non_overlapping_test'),
    path('run_overlapping_test/',views.run_overlapping_test, name='run_overlapping_test'),
    path('run_serial_test/',views.run_serial_test, name='run_serial_test'),
    path('run_cumulative_sums_test/',views.run_cumulative_sums_test, name='run_cumulative_sums_test'),
    path('random_excursions_test/',views.run_random_excursions_test, name='run_random_excursions_test'),
    path('random_excursions_variant_test/',views.random_excursions_variant_test, name='random_excursions_variant_test'),
    path('run_binary_matrix_rank_text/',views.run_binary_matrix_rank_text, name='run_binary_matrix_rank_test'),
    path('run_universal_test/',views.run_universal_test, name='run_universal_test'),
    path('run_dft_test/',views.run_dft_test, name='run_dft_test'),
   
    # # nist sp 800-90b
    path('run_collision_test/', views.run_collision_test, name='run_collision_test'),
    path('run_markov_test/',views.run_markov_test, name='run_markov_test'),
    path('run_compression_test/',views.run_compression_test, name='run_compression_test'),
    path('run_lag_test/',views.run_lag_test, name='run_lag_test'),
    path('run_mcw_test/',views.run_mcw_test, name='run_mcw_test'),
    path('run_mmc_test/',views.run_mmc_test, name='run_mmc_test'),
    path('run_lz78y_test/',views.run_lz78y_test, name='run_lz78y_test'),
    
 
    # #report generation
    path('pdf-report/', views.generate_pdf_report, name='generate_pdf_report'),
    path("get_progress_nist/<uuid:job_id>/", views.get_progress_nist, name="get_progress_nist"),
    
    path('pdf-report-nist90b/', views.generate_pdf_report_nist90b, name='generate_pdf_report'),
    path("get_progress_nist90b/<uuid:job_id>/", views.get_progress_nist90b, name="get_progress_nist90b"),
    
    path('pdf-report-dieharder/', views.generate_pdf_report_dieharder, name='generate_pdf_report_dieharder'),
    path("get_progress_ReportDieharder/<uuid:job_id>/", views.get_progress_ReportDieharder, name="get_progress_ReportDieharder"),
    
    path('pdf-report-server/', views.generate_pdf_report_server, name='generate_pdf_report_server'),
    path("get_progress_server/<uuid:job_id>/", views.get_progress_server, name="get_progress_server"),
    
    # #graph generation
    path('graph-generation/', views.create_graph, name='create_graph'),
    path("get_progress_graph/<uuid:job_id>/", views.get_progress_graph, name="get_progress_graph"),
    
    path('graph-generation-nist90b/', views.create_graph_nist90b, name='create_graph_nist90b'),
    path('get_progress_graph90b', views.get_progress_graph90b, name='get_progress_graph90b'),
    
    path('graph-generaion-dieharder/', views.create_graph_dieharder, name='create_graph_dieharder'),
    path('get_progress_graphDieharder/<uuid:job_id>/', views.get_progress_graphDieharder, name='get_progress_graphDieharder'),
    
    # final ans
    path('generate_final_ans/', views.generate_final_ans, name='generate_final_ans'),
    path("get_progress/<uuid:job_id>/", views.get_progress, name="get_progress"),
    
    path('generate_final_ans_nist90b/', views.generate_final_ans_nist90b, name='generate_final_ans_nist90b'),
    path("get_progress90b/<uuid:job_id>/", views.get_progress90b, name="get_progress90b"),

    path('generate_final_ans_dieharder/', views.generate_final_ans_dieharder, name='generate_final_ans_dieharder'),
    path("get_progress_dieharder/<uuid:job_id>/", views.get_progress_dieharder, name="get_progress_dieharder"),

    # dieharder tests
    path('minDist-test/', DieharderMinDistTestView.as_view()),
    path('operm5-test/', DieharderOperm5TestView.as_view()),
    path('birthday-test/', DieharderBirthdayTestView.as_view()),
    path('parking-test/', DieharderParkingLotTestView.as_view()),
    path('squeeze-test/', DieharderSqueezeTestView.as_view()),
    path('countOne-test/', DieharderCountOneTestView.as_view()),
    path('countOneByte-test/', DieharderCountOneStreamTestView.as_view()),
    path('oqso-test/', DieharderOQSOTestView.as_view()),
    path('dna-test/', DieharderDnaTestView.as_view()),
    path('opso-test/', DieharderOPSOTestView.as_view()),
    path('bitstream-test/', DieharderBitstreamTestView.as_view()),
    path('6x8rank-test/', Dieharder6x8RankTestView.as_view()),
    path('tsang-test/', DieharderTsangTestView.as_view()),
    path('craps-test/', DieharderCrapsTestView.as_view()),
    path('stsruns-test/', DieharderStsRunsTestView.as_view()),
    path('stsmonobit-test/', DieharderStsMonoTestView.as_view()),
    path('laggedSum-test/', DieharderLaggedTestView.as_view()),
    path('32rank-test/', Dieharder32RankTestView.as_view()),
    path('x-test/', DieharderxTestView.as_view()),
   
]

# http://127.0.0.1:8000/sse_binary_example/