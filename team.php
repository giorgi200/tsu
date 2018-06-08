<!DOCTYPE html>
<html>
    <?php require_once('layout/head.php'); ?>
<body>
  <div class="page-wrapper">
      <!-- ========= Main Header ============-->
      <?php require_once('layout/navbar.php'); ?>
      <!-- ========= End Main Header ============-->

      <!--Page Title-->
      <section class="page-title text-center" style="background-image:url(images/background/3.jpg);">
        <div class="container">
            <div class="title-text">
                <h1>აკადემიური პერსონალი</h1>
            </div>
        </div>
    </section>
    <!--End Page Title-->

    <section class="team-section section">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <!-- Nav tabs -->
                    <div class="tabs">
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active">
                                <a href="#doctor" data-toggle="tab"> ასისტენტ პროფესორი </a>
                            </li>
                            <li role="presentation">
                                <a href="#event-planning" data-toggle="tab"> ასოცირებული პროფესორი </a>
                            </li>
                            <li role="presentation">
                                <a href="#lab" data-toggle="tab"> სრული  პროფესორი </a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content">
                        <!--Start single tab content-->
                        <div class="team-members tab-pane fade in active row" id="doctor">
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/doctor-1.jpg" class="img-responsive" alt="team">
                                    <h6>ბოჭორიშვილი რამაზ</h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/doctor-2.jpg" class="img-responsive" alt="team">
                                    <h6>ბოჭორიშვილი რამაზ</h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/doctor-3.jpg" class="img-responsive" alt="team">
                                    <h6>ბოჭორიშვილი რამაზ</h6>
                                </div>
                            </div>
                        </div>
                        <div class="team-members tab-pane fade in row" id="event-planning">
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/event-1.jpg" class="img-responsive" alt="team">
                                    <h6>ბოჭორიშვილი რამაზ</h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/event-2.jpg" class="img-responsive" alt="team">
                                    <h6>ბოჭორიშვილი რამაზ</h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/event-3.jpg" class="img-responsive" alt="team">
                                    <h6>Tom Moddy</h6>
                                </div>
                            </div>
                        </div>
                        <div class="team-members tab-pane fade in row" id="lab">
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/doctor-lab-1.jpg" class="img-responsive" alt="team">
                                    <h6>ბოჭორიშვილი რამაზ</h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/doctor-lab-2.jpg" class="img-responsive" alt="team">
                                    <h6>ბოჭორიშვილი რამაზ</h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6 leqs" data-dhref="singele-blog.html" >
                                <div class="team-person text-center teamer">
                                    <img src="images/team/doctor-lab-3.jpg" class="img-responsive" alt="team">
                                    <h6>ბოჭორიშვილი რამაზ</h6>
                                </div>
                            </div>
                        </div>
                        <!--End single tab content-->
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
<?php require_once('layout/script.php'); ?>
<!--End pagewrapper-->
</body>
</html>