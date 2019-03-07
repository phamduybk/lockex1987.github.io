<general-info>
    <div class="profile-contact-wraper">
        <!--div>
        <span class="fa fa-calendar"></span>
        <span>DOB: 11/05/1987</span>
        </div-->
        <!--div>
        <span class="fa fa-user"></span>
        <span>Gender: Male</span>
        </div-->
        <div>
        <span class="fa fa-phone"></span>
        <span>038 651 9125</span>
        </div>
        <div>
        <span class="fa fa-envelope-square"></span>
        <span>lockex1987@gmail.com</span>
        </div>
        <div>
        <span class="fa fa-map-marker"></span>
        <span>Hanoi, Vietnam</span>
        </div>
        <div>
        <span class="fa fa-info"></span>
        <span>lockex1987.github.io</span>
        </div>
    </div>

    <!--div class="profile-description">
        <p>I'm Nguyễn Văn Huyên, a programmer with 9+ years experience
        coding web applications.</p>
        <p>My passion is to create useful, elegant applications that help other people in their work and their life.</p>
        <p>I always aware of performance, security, convenience of
        systems. I think that good design and coding convention are
        very important. I usually research new technologies, new
        ideas, new philosophies.</p>
        <p>I have a high responsibility with work.</p>
        <p>And I love programming too!</p>
    </div-->

    <div class="profile-description">
        <p>Tôi là Huyên, một lập trình viên với hơn 9 năm kinh nghiệm làm các hệ thống web.</p>
        <p>Tôi là một người yêu lập trình và có trách nhiệm với công việc.</p>
    </div>


    <style type="text/less">
        .profile-contact-wraper {
            margin: 30px 0 20px;

            @media (min-width: 900px) {
                display: flex;
                justify-content: space-evenly;
            }
            
            div {
                text-align: left;
                padding: 10px;

                @media (min-width: 900px) {
                    text-align: center;
                }
                

                .fa {
                    width: 20px;
                    height: 20px;

                    @media (min-width: 900px) {
                        display: block;
                        margin: 20px auto;
                        font-size: 32px;
                    }
                }

                .fa-phone {
                    color: #fc5c65;
                }
                .fa-envelope-square {
                    color: #a55eea;
                }
                .fa-map-marker {
                    color: #4b7bec;
                }
                .fa-info {
                    color: #20bf6b;
                }
            }
        }

        .profile-description {
            p {
                //color: blue;
            }
        }
    </style>
</general-info>