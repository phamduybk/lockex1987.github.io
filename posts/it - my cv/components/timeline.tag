<timeline>
    <div class="timeline">
        <div class="container right">
          <div class="content">
            <h2>2005-2009</h2>
            <img src="images/coltech.png"/>
            <p>Học khoa Công nghệ thông tin, đại học Công nghệ.</p>
            <p>Tốt nghiệp loại Giỏi.<p>
          </div>
        </div>

        <div class="container left">
          <div class="content">
            <h2>2009-2015</h2>
            <img src="images/viettel.png" />
            <p>Làm việc ở trung tâm phần mềm Viettel.</p>

            <ul>
              <li>
                <span lang="en">KM: Knowledge Management.</span>
                <span lang="vi">KM: Hệ thống quản lý tri thức</span>
              </li>
              <li>
                <span lang="en">KPI (Key Performance Indicator): read and report KPI of servers</span>
                <span lang="vi">KPI: Hệ thống quản lý KPI</span>
              </li>
              <li>
                <span lang="en">QLOTO: car management; you can view current position or track route of a car on Google Map.</span>
                <span lang="vi">QLOTO: Hệ thống quản lý ô tô (có theo dõi vị trí và lộ trình xe trên Google Map)</span>
              </li>
              <li>
                <span lang="en">QLSX: Production Management.</span>
                <span lang="vi">QLSX: Hệ thống quản lý sản xuất</span>
              </li>
              <li>
                <span lang="en">TDKT: Import from and export to Excel file the reward information of employees.</span>
                <span lang="vi">TĐKT: Thi đua khen thưởng</span>
              </li>
              <li>
                <span lang="en">Dataroom: manage files of a user by user folders.</span>
                <span lang="vi">Dataroom: Hệ thống quản lý file</span>
              </li>
              <li>
                <span lang="en">Email: send propaganda email to all employees of Viettel Group.</span>
                <span lang="vi">Email: Gửi mail truyền thông</span>
              </li>
              <li>
                <span lang="en">VHR: Viettel Human Resource.</span>
                <span lang="vi">VHR: Quản lý nhân sự</span>
              </li>
              <li>
                <span lang="en">VPS: Viettel Privilege System.</span>
                <span lang="vi">VPS: Hệ thống phân quyền tập trung</span>
              </li>
              <li>
                <span lang="en">VPM: Viettel Payroll Management.</span>
                <span lang="vi">VPM: Quản trị tiền lương</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="container right">
          <div class="content">
            <h2>2015</h2>
            <img src="images/imip.png" />
            <p>Làm việc ở công ty IMIP.</p>
            <ul>
              <li>
                <span lang="en">iMIP: operates with multi-function printer.</span>
                <span lang="vi">Làm một số chức năng tương tác với máy in đa chức năng</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="container left">
          <div class="content">
            <h2>2015-2016</h2>
            <img src="images/ifi solution.png" />
            <p>Chuyển sang công ty IFI Solutions.</p>
            <ul>
              <li>
                <span lang="en">M2M: manages energy data of a French customer.</span>
                <span lang="vi">M2M: Quản lý năng lượng (khách hàng Pháp)</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="container right">
          <div class="content">
            <h2>Từ 2016</h2>
            <img src="images/vtcc.png" />
            <p>Làm việc cho trung tâm Không gian mạng Viettel.</p>
            <ul>
              <li>
                <a href="https://safenet.vn/" target="_blank">safenet.vn</a>: 
                <span lang="en">Internet filter</span>
                <span lang="vi">Dịch vụ giám sát Internet của con cái</span>
              </li>
              <li>
                <a href="https://itrithuc.vn/" target="_blank">itrithuc.vn</a>:
                <span lang="en">Vietnamese Knowledge System Digitalization</span>
                <span lang="vi">Hệ tri thức Việt số hóa</span>
              </li>
              <li>
                <a href="https://vtcc.ai/" target="_blank">vtcc.ai</a>:
                <span lang="en">Voice Platform</span>
                <span lang="vi">Dịch vụ TTS và ASR (Voice)</span>
              </li>
            </ul>
          </div>
        </div>
    </div>


    <style type="text/less">
        /* The actual timeline (the vertical ruler) */
        @bg-color: #4b7bec;


        .timeline {
          position: relative;
          max-width: 1200px;
          margin: 20px auto;
          //color: #FFF;

          /* The actual timeline (the vertical ruler) */
          &::after {
            content: "";
            position: absolute;
            width: 4px;
            background-color: rgba(71, 77, 93, 0.95);
            top: 0;
            bottom: 0;
            left: 50%;
            margin-left: -2px;
          }

          /* Container around content */
          .container {
            padding: 10px 40px;
            position: relative;
            background-color: inherit;
            width: 50%;

            /* The circles on the timeline */
            &::after {
              content: "";
              position: absolute;
              //display: none;
              width: 16px;
              height: 16px;
              right: -8px;
              top: 24px;
              background-color: #FFF;
              border: 4px solid #fc5c65;
              
              border-radius: 50%;
              z-index: 1;
            }

            /* The actual content */
            .content {
                padding: 20px 30px;
                //background-color: @bg-color;
                border: 2px solid @bg-color;
                position: relative;
                border-radius: 6px;

                img {
                    width: 64px;
                }

                a {
                  color: @bg-color;
                }
            }
          }

          /* Place the container to the left */
          .left {
            left: 0;

            /* Add arrows to the left container (pointing right) */
            &::before {
              content: " ";
              height: 0;
              position: absolute;
              top: 22px;
              width: 0;
              z-index: 1;

              right: 30px;
              border: medium solid @bg-color;
              border-width: 10px 0 10px 10px;
              border-color: transparent transparent transparent @bg-color;
            }
          }

          /* Place the container to the right */
          .right {
            left: 50%;

            /* Add arrows to the right container (pointing left) */
            &::before {
              content: " ";
              height: 0;
              position: absolute;
              top: 22px;
              width: 0;
              z-index: 1;
              
              left: 30px;
              border: medium solid @bg-color;
              border-width: 10px 10px 10px 0;
              border-color: transparent @bg-color transparent transparent;
            }

            /* Fix the circle for containers on the right side */
            &::after {
              left: -8px;
            }
          }
        }

        /* Media queries - Responsive timeline on screens less than 600px wide */
        @media screen and (max-width: 900px) {
          /* Place the timelime to the left */
          .timeline {
            &::after {
              left: 31px;
            }

            /* Full-width containers */
            .container {
              width: 100%;
              padding-left: 70px;
              padding-right: 25px;

              /* Make sure that all arrows are pointing leftwards */
              &::before {
                left: 60px;
                border: medium solid @bg-color;
                border-width: 10px 10px 10px 0;
                border-color: transparent @bg-color transparent transparent;
              }
            }

            /* Make sure all circles are at the same spot */
            .left::after,
            .right::after {
              left: 23px;
            }

            /* Make all right containers behave like the left ones */
            .right {
              left: 0%;
            }
          }
        }
    </style>
</timeline>