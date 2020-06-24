////////////////////////////////////////////////////
// DESIGN TOOLS CONFIG                            //
////////////////////////////////////////////////////
// Copyright (C) 2017  Utah State University
var DT_variables = {
        iframeID: '',
        // Path to the hosted USU Design Tools
        path: 'https://designtools.ciditools.com/',
        templateCourse: '1996',
        // OPTIONAL: Button will be hidden from view until launched using shortcut keys
        hideButton: false,
    	 // OPTIONAL: Limit by course format
	     limitByFormat: false, // Change to true to limit by format
	     // adjust the formats as needed. Format must be set for the course and in this array for tools to load
	     formatArray: [
            'online',
            'on-campus',
            'blended'
        ],
        // OPTIONAL: Limit tools loading by users role
        limitByRole: false, // set to true to limit to roles in the roleArray
        // adjust roles as needed
        roleArray: [
            'student',
            'teacher',
            'admin'
        ],
        // OPTIONAL: Limit tools to an array of Canvas user IDs
        limitByUser: true, // Change to true to limit by user
        // add users to array (Canvas user ID not SIS user ID)
        userArray: [
            '3345',
            '3398'
        
        ]
};

// Run the necessary code when a page loads
$(document).ready(function () {
    'use strict';
    // This runs code that looks at each page and determines what controls to create
    $.getScript(DT_variables.path + 'js/master_controls.js', function () {
        console.log('master_controls.js loaded');
    });
});
////////////////////////////////////////////////////
// START LOGIN VIDEO BACKGROUND                   //
////////////////////////////////////////////////////

// Start Login Video
$('body.ic-Login-Body .ic-app').prepend('<video autoplay loop id="bgvid"><source src="https://ait.instructure.com/courses/1962/files/445084/preview" type="video/webm"><source src="https://ait.instructure.com/courses/1962/files/445083/preview" type="video/mp4"></video><div class="video-dottedoverlay"></div>');
// End Login Video

////////////////////////////////////////////////////
// UTILS                            //
////////////////////////////////////////////////////

var ait = {
    util: {}
}

// https://gist.github.com/ryanflorence/5817898
ait.util.onPage = function(rex, fn, fnfail) {
    'use strict';

    var match = location.pathname.match(rex);

    if (typeof fn !== 'undefined' && match) {
        return fn();
    }
    if (typeof fnfail !== 'undefined' && !match) {
        return fnfail();
    }
    return match ? match : false;
}

ait.util.hasAnyRole = function() {
    'use strict';

    var roles = Array.prototype.slice.call(arguments, 0),
        i;
    // so it doesn't generate an error on login page
    if (typeof ENV.current_user_roles === 'undefined' || !ENV.current_user_roles) {
        return false;
    }
    for (i = 0; i < roles.length; i++) {
        if (ENV.current_user_roles.indexOf(roles[i]) !== -1)
            return true;
    }
    return false;
}

////////////////////////////////////////////////////
// GLOBAL NAV TRAY                                //
////////////////////////////////////////////////////

/**
// @name        Global Nav - Custom Tray
// @namespace   https://github.com/robert-carroll/ccsd-canvas
// @author      Robert Carroll <carror@nv.ccsd.net>
//
// Pin by [Gregor Cresnar](https://thenounproject.com/grega.cresnar/) from [The Noun Project]
// https://creativecommons.org/licenses/by/3.0/
**/
$(document).ready(function() {
    ///* set tray title, icon, links and footer here *///
    ///*  for user role based conditions see README  *///
    var title   = 'Online Resources',
		svg     = 'https://eduridden.github.io/Canvas_Code/AIT/library.svg',
		// default links for all users
		trayLinks = [
			{ href: 'https://ait.instructure.com/courses/1970/announcements', svg_icon: 'link', title: 'Student News', desc:'Important updates and events for students' },
            { href: 'https://ait.instructure.com/courses/1972', svg_icon: 'link', title: 'College Library', desc:'Access the College Library services online' },
			{ href: 'https://redhill.freshdesk.com/', svg_icon: 'link', title: 'Online Learning Support', desc:'Got a problem? Contact support through the helpdesk' },
            { href: 'https://redhill.freshdesk.com/support/solutions', svg_icon: 'link', title: 'Self Help Guides', desc:'Help yourself with these great online guides' },
            { href: 'http://ait.checkfront.com/reserve', svg_icon: 'link', title: 'Lab Bookings - MLB', desc:'Book a space in a Melbourne Computer Lab' },
            { href: 'http://aitbookings.checkfront.com/reserve', svg_icon: 'link', title: 'Lab Bookings - SYD', desc:'Book a space in a Sydney Computer Lab' }
		],
		footer  = '<center><img src="https://eduridden.github.io/Canvas_Code/AIT/helpful_panda.png" width="110px" alt="Panda"></center><p>These links are provided to enable you with all the information you need to study online.</p>';
	
	// these links are appended to the tray by user role
    
	//if(ENV.current_user_roles.indexOf('teacher') >= 0 || ENV.current_user_roles.indexOf('admin') >= 0){
        //trayLinks.push({ href: 'http://www.example.com/your-library', title: 'Teacher Library', desc:'Optional text description' })
    //} else if (ENV.current_user_roles.indexOf('student') >= 0) {
        //trayLinks.push({ href: 'https://ait.instructure.com/courses/1962', title: 'Canvas Student Guide', desc:'Start here if you want to learn how to use Canvas better.' })
    //}
        
    ///* options are above for convenience, continue if you like *///
    var tidle     = title.replace(/\s/, '_').toLowerCase(),
        trayid    = 'global_nav_'+tidle+'_tray',
        trayItems = '',
        trayLinks = trayLinks.forEach(function(link) {
            trayItems += '<li class="gcnt-list-item">'
                      + '<span class="gcnt-list-link-wrapper">'
                      + '<a target="_blank" rel="noopener" class="gcnt-list-link" href="'+link.href+'" role="button" tabindex="0"><img src="https://eduridden.github.io/Canvas_Code/AIT/' + link.svg_icon + '.svg" style="width:10px; padding-right: 5px;">'+ link.title +'</a>'
                      + '</span>';
            // append link description if set
            if(!!link.desc && link.desc.length > 1)
                { trayItems +='<div class="gcnt-link-desc" style="padding-bottom: 5px;">'+ link.desc +'</div>' }
            trayItems += '</li>';
        }),
        
        // tray html
        tray = '<span id="'+trayid+'" style="display: none;">'
            + '<span class="global-nav-custom-tray gnct-easing">'
            + '<span role="region" aria-label="Global navigation tray" class="Global-navigation-tray">'
            // begin close button
            + '<span class="gcnt-tray-close-wrapper">'
            + '<button id="'+trayid+'_close" type="button" role="button" tabindex="0" class="gcnt-tray-close-btn" style="margin:0px;">'
            + '<span class="gcnt-tray-close-svg-wrapper">'
            + '<svg name="IconXSolid" viewBox="0 0 1920 1920" style="fill:currentColor;width:1em;height:1em;" width="1em" height="1em" aria-hidden="true" role="presentation" disabled="true">'
            + '<g role="presentation"><svg version="1.1" viewBox="0 0 1920 1920">'
            + '<path d="M1743.858.012L959.869 783.877 176.005.012 0 176.142l783.74 783.989L0 1743.87 176.005 1920l783.864-783.74L1743.858 1920l176.13-176.13-783.865-783.74 783.865-783.988z" stroke="none" stroke-width="1"></path>'
            + '</svg></g></svg><span class="gcnt-tray-close-txt">Close</span></span></button></span>'
            // end of close button; begin tray header
            + '<div class="tray-with-space-for-global-nav">'
            + '<div id="custom_'+tidle+'_tray" class="gnct-content-wrap">'
            + '<h1 class="gcnt-tray-h1">'+ title +'</h1><hr>'
            // end tray header; begin tray links list
            + '<ul class="gcnt-list">'
            + trayItems;
            // end tray links; if there is a footer, append it
            if(footer.length > 1) {
                tray += '<li class="gcnt-list-item"><hr></li>'
                      + '<li class="gcnt-list-item">'+ footer + '</li>';
            }
            // end tray html
            tray += '</ul></div></div></span></span></span>';
    // global nav icon
    var main = $('#main'),
        menu = $('#menu'),
        icon = $('<li>', {
            id: 'global_nav_'+tidle+'_menu',
            class: 'ic-app-header__menu-list-item',
            html: '<a id="global_nav_'+tidle+'_link" href="javascript:void(0)" class="ic-app-header__menu-list-link">'
              + '<div class="menu-item-icon-container" role="presentation"><span class="svg-'+tidle+'-holder"></span></div>'
              + '<div class="menu-item__text">' + title + '</div></a>'
            });
        icon.find('.svg-'+tidle+'-holder').load(svg, function(){
            var svg = $(this).find('svg')[0],
                svg_id = 'global_nav_'+tidle+'_svg';
                svg.setAttribute('id', svg_id);
                svg.setAttribute('class', 'ic-icon-svg menu-item__icon ic-icon-svg--apps svg-icon-help ic-icon-svg-custom-tray')
                $('#'+svg_id).find('path').removeAttr('fill')
        });
    menu.append(icon);
    main.append(tray);
    // if you ventured this far, please note variable reassignment
    icon = $('#global_nav_'+tidle+'_menu');
    tray = $('#'+trayid);

    // TODO: there's a delay in switching active icon states, sometimes both are active for a moment

    // multiple ways for the tray to get closed, reduce and reuse
    function close_gnct() {
        menu.find('a').each(function(){this.onmouseup = this.blur()})
        tray.find('.gnct-easing').animate({
            left: '-200px', opacity: .8
        }, 300, 'linear', function() {
            tray.hide()
            icon.removeClass('ic-app-header__menu-list-item--active')
        })
    }
    icon.click(function() {
        // if the tray is open, close it
        if($(this).hasClass('ic-app-header__menu-list-item--active')) {
            close_gnct()
        // else open the tray
        } else {
            menu.find('a').each(function(){this.onmouseup = this.blur()})
            tray.show()
            tray.find('.gnct-easing').animate({
                left: '0px', opacity: 1
            }, 300, 'linear', function() {
                $('.ic-app-header__menu-list-item').removeClass('ic-app-header__menu-list-item--active');
                icon.addClass('ic-app-header__menu-list-item--active');
            })
        }
    });
    // close the tray if the user clicks another nav icon that is not this one
    $('.ic-app-header__menu-list-item').not(icon).click(function() { close_gnct(); });
    // close the tray
    $('#'+trayid+'_close').click(function() { close_gnct(); });
});

////////////////////////////////////////////////////
// NEWS WIDGET                                    //
////////////////////////////////////////////////////

$('.with-right-side #right-side').prepend('<iframe src="https://feed.mikle.com/widget/v2/130840/?preloader-text=Loading" height="330px" width="100%" class="fw-iframe" scrolling="no" frameborder="0"></iframe>');


////////////////////////////////////////////////////
// START SANDBOX                                   //
////////////////////////////////////////////////////

/**
// @name        Canvas LMS - Create a Sandbox Button
// @namespace   https://github.com//robert-carroll/ccsd-canvas
// @author      Aaron Leonard <leonaa@nv.ccsd.net> [v1]
// @author      Robert Carroll <carror@nv.ccsd.net> [v1.0.1]
**/

(function() {
  var handleNewCourse = function() {
    ait.util.hasAnyRole("admin")
      ? $("#start_new_course").show()
      : $("#start_new_course").remove();
  };
  handleNewCourse();
})();

(function() {
    var sandbox = {
        cfg: {
            // the ID of the subaccount where all sandboxs should be put
            sandbox_acct_id: 91,
            // the ID of the term that all sandboxs should be created with (Forever)
            term_id: 127,
            // the roles allowed to create a sandbox
            roles: ['teacher']
        }
    }
    sandbox.alert = function(title, message) {
        $('#enrollAlert').html(message).dialog({
            title: title
        })
    }
    sandbox.codedDate = function(date) {
        return date
            .toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
            .replace(/\,\s/g, '_')
            .replace(/\s/g, '')
            .toUpperCase()
            .replace(/AM|PM/, '')
    }
    sandbox.getSISID = function() {
        return $.get(
                '/api/v1/courses?per_page=1&enrollment_type=teacher&enrollment_state=active'
            )
            .pipe(function(courses) {
                if (courses.length == 0) {
                    return $.Deferred().reject()
                }
                return $.get('/api/v1/courses/' + courses[0].id + '/enrollments?user_id=self')
            })
            .pipe(function(enroll) {
                if (enroll.length === 0 || !enroll[0].user.sis_user_id) {
                    return $.Deferred().reject()
                }
                return enroll[0].user.sis_user_id
            })
    }
    sandbox.enroll = function(employee_id, shortName) {
        // https://*.instructure.com/doc/api/courses.html#method.courses.create
        var DATE_FM = sandbox.codedDate(new Date()),
            long_name = 'Sandbox - ' + ENV.current_user.display_name + ' -- ' + DATE_FM,
            short_name = 'SB-' + shortName,
            course_id = 'sandbox-' + employee_id + '-' + DATE_FM;

        var data = {
            course: {
                name: long_name,
                course_code: short_name,
                //sis_course_id: course_id,
                is_public: false,
                is_public_to_auth_users: false,
                enrollment_term_id: sandbox.cfg.term_id
            },
            enroll_me: true
        };
        return $.ajax({
            url: '/api/v1/accounts/' + sandbox.cfg.sandbox_acct_id + '/courses',
            type: 'POST',
            method: 'POST',
            data: data
        }).pipe(
            function(res) {
                window.location = '/courses/' + res.id
            },
            function() {
                sandbox.alert(
                    'Error',
                    'There was an error creating the sandbox.'
                )
            }
        )
    }
    sandbox.init = function() {
        // This initializes the DOM elements necessary for creating a sandbox
        var enrollBtn = $('<button>', {
            class: 'btn button-sidebar-wide pull-right',
            id: 'enrollsandboxBtn',
            style: 'margin-top: 10px;'
        }).text("Create a sandbox");

        var enrollHtml =
            '<div id="enrollsandbox" style="display: none;"><table class="formtable">'
            + '<tr class="formrow"><td>'
            + '<label>Employee Id:<span>*</span></label>'
            + '</td><td><input type="text" name="employee_id" />'
            + '</td></tr>'
            + '<tr class="formrow"><td>'
            + '<label>Enter Course Short Name:<span>*</span></label>'
            + '</td><td>'
            + '<input type="text" name="short_name" required maxlength="16" />'
            + '</td></tr>'
            + '</table></div>'
            + '<div id="enrollAlert"></div>';

        enrollBtn.prependTo($('.header-bar'));
        $('body').append(enrollHtml);

        enrollBtn.click(function(e) {
            var btn = $(this),
                origTex = btn.text()

            e.preventDefault()

            btn.prop('disabled', true)
                .text('Working...')
                .addClass('btn-primary')

            sandbox.getSISID()
                .pipe(
                    function(sis_user_id) {

                        var dfd = $.Deferred();

                        $('#enrollsandbox :input').val('').prop('disabled', false)
                        $('#enrollsandbox .formrow').show()

                        $('#enrollsandbox').dialog({
                            title: 'Create a New sandbox',
                            width: '450',
                            buttons: [{
                                    text: 'Close',
                                    click: function() {
                                        $(this).dialog('close');
                                        dfd.reject();
                                    }
                                },
                                {
                                    text: 'Add sandbox',
                                    class: 'btn-primary',
                                    click: function() {
                                        var employee_id = sis_user_id ? sis_user_id : 'E' + $(this).find('[name=employee_id]').val();
                                        var shortName = $(this).find('[name=short_name]').val();

                                        if (shortName.length < 1) {
                                            sandbox.alert('Error', 'Please enter a short name.');
                                            //return dfd.reject();
                                        } else {
                                            dfd.resolve({
                                                employee_id: employee_id,
                                                shortName: shortName
                                            });
                                            $(this).dialog('close');
                                        }
                                    }
                                }
                            ],
                            close: function() {
                                dfd.reject();
                            }
                        });

                        // if sis_user_id is present we don't need to display the field
                        if (sis_user_id) {
                            $('#enrollsandbox [name=employee_id]')
                                .val(sis_user_id)
                                .prop('disabled', true)
                                .closest('.formrow')
                                .hide();
                        }
                        return dfd;
                    },
                    function() {
                        alert('Something went wrong. We apologize for any inconvenience.');
                    }
                )
                .pipe(function(data) {
                    return sandbox.enroll(data.employee_id, data.shortName);
                })
                .done(function() {
                    btn.text('Done!').addClass('btn-success');
                })
                .fail(function() {
                    btn.text(origTex);
                    btn.prop('disabled', false).removeClass('btn-success btn-primary');
                });
        });
    }
    ait.util.onPage(/\/courses$/, function() {
        if (ait.util.hasAnyRole.apply(this, sandbox.cfg.roles)) {
            sandbox.init();
        }
    });
})();


////////////////////////////////////////////////////
// START CUSTOM FOOTER LINKS                      //
////////////////////////////////////////////////////

$('.with-right-side #wrapper').append('<footer role="contentinfo" id="ait-footer" class="ic-app-footer"><a href="http://www.instructure.com" class="footer-logo ic-app-footer__logo-link"><span class="screenreader-only">By Instructure</span></a><div id="footer-links" class="ic-app-footer__links"><a href="https://res.cloudinary.com/ait-website/image/upload/v1545210525/pdf/Academy_of_Information_Technology_-_Terms_and_Conditions_V1.2_18122018.pdf" target="_new">Terms & Conditions</a><a href="https://drive.google.com/a/redhilleducation.com/file/d/0B-ZEAxMIrGrIc0NVNjZWSW1GeUxXVkh0N3luNC1PNTlMYkJj/view?usp=sharing" target="_new">Privacy & Data Collection Policy</a><a href="https://drive.google.com/file/d/1x9nGV8bqCePxQxOhsN8m0NOKWC1H_eI3/view" target="_new">Withdrawals, Refunds and Cancellations Policy</a><a href="https://res.cloudinary.com/ait-website/image/upload/v1543336413/pdf/ACCESS_and_EQUITY_POLICY_1.pdf" target="_new">Access & Equity Policy</a><a href="https://drive.google.com/file/d/1Z0A4axGBgQK194d8vt1A-M6W12Lk0nGn/view" target="_new">Online Code of Conduct</a></div></footer>');

////////////////////////////////////////////////////
// START COURSE FILTER CODE                       //
////////////////////////////////////////////////////

$(document).ready(function() {
  if ($("div.context_module").length > 0) {

    $("div.header-bar").append("<div><ul id='module_filters' style='list-style-type: none; display: inline;'></ul></div>");

    var item_types = [{id: "wiki_page", label: "Pages", icon: "icon-document"},
                      {id: "assignment", label: "Assignments", icon: "icon-assignment"},
                      {id: "quiz", label: "Quizzes", icon: "icon-quiz"},
                      {id: "lti-quiz", label: "Quizzes", icon: "icon-quiz icon-Solid"},
                      {id: "discussion_topic", label: "Discussion Topics", icon: "icon-discussion"},
                      {id: "external_url", label: "Links", icon: "icon-link"},
                      {id: "attachment", label: "Files", icon: "icon-paperclip"},
                      {id: "context_external_tool", label: "External Tools", icon: "icon-integrations"}];

    item_types.forEach(function(type) {
      var icon = `<i id="module_filter_${type['id']}" class="${type['icon']}" title="${type['label']}"></i>`;

      $("ul#module_filters").append(`<li style="padding: 0 1em 0 0; display: inline-block;"><input type="checkbox" id="${type['id']}" name="${type['id']}" checked style="display: none;"> <label for="${type['id']}">${icon}</label></li>`);

      $(`#${type['id']}`).change(function() {
        if (this.checked == true) {
          $(`li.${type['id']}`).show();
          $(`#module_filter_${type['id']}`).css('background-color', '');
        }
        else {
          $(`li.${type['id']}`).hide();
          $(`#module_filter_${type['id']}`).css('background-color', 'darkgrey');
        }
      });
    });
  }
});

////////////////////////////////////////////////////
// START BULK STUDENT REMOMVAL TOOL               //
////////////////////////////////////////////////////
// @name         Canvas Student Course Enrollment Manager
// @namespace    https://github.com/sukotsuchido/CanvasUserScripts
// @version      1.5
// @description  A Canvas UserScript to manage course enrollments
// @author       Chad Scott (ChadScott@katyisd.org)
// @include     https://*.instructure.com/courses/*/users
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @grant        none

(function() {
    'use strict';
    var assocRegex3 = new RegExp('^/courses/([0-9]+)/users');
    var errors = [];
    var courses = [];
    var sections = [];
    var array =[];
    var courseID = $(location).attr('pathname');
    courseID.indexOf(1);
    courseID = courseID.split("/")[2];
    var pageNum = 0;
    /* role setup */
    var roles = ENV.current_user_roles;
    var buttonRoles = ["admin", "root_admin"];
    var test1 = buttonRoles.some(el => roles.includes(el));
    if( (test1 === true) && (assocRegex3.test(window.location.pathname))){
        add_button();
    }

    function add_button() {
        var parent = document.querySelector('div.ic-Action-header__Secondary');
        if (parent) {
            var el = parent.querySelector('#manage_enrollments');
            if (!el) {
                el = document.createElement('button');
                el.classList.add('Button','button-primary','element_toggler');
                el.type = 'button';
                el.id = 'manage_enrollments';
                var icon = document.createElement('i');
                icon.classList.add('icon-user');
                el.appendChild(icon);
                var txt = document.createTextNode(' Manage Course Enrollments');
                el.appendChild(txt);
                el.addEventListener('click', openDialog);
                parent.prepend(el);
            }
        }
    }

    function getSections(){
        var url = "/api/v1/courses/"+courseID+"/sections?&per_page=100";
        $.ajax({
            'async': true,
            'type': "GET",
            'global': true,
            'dataType': 'JSON',
            'data': JSON.stringify(sections),
            'contentType': "application/json",
            'url': url,
            'success': function (data, textStatus, response) {

                $.each(data,function(i,o){
                    var sectionID = o.id;
                    var sectionName = o.name;

                    sections.push({
    key:   sectionID,
    value: sectionName
});

                });

            }
    });
    }

    function getStudents(){
        // Reset global variable errors
        errors= [];
        document.getElementById('moreStu').value = ++pageNum;
        var url = "/api/v1/courses/"+courseID+"/enrollments?type[]=StudentEnrollment&per_page=100&page="+pageNum;
        $.ajax({
            'async': true,
            'type': "GET",
            'global': true,
            'dataType': 'JSON',
            'data': JSON.stringify(courses),
            'contentType': "application/json",
            'url': url,
            'success': function (data, textStatus, response) {
                var toAppend;
                $.each(data,function(i,o){
                    var dateStr;
                    var dateEnrStr;

                    var stuSectionID;
                    var stuSectionName;
                    stuSectionID = o.course_section_id;

                    stuSectionName = sections.find(item => item.key === stuSectionID).value;



                    var date2 = new Date(o.created_at);
                        var day2 = date2.getDate();
                        var year2 = date2.getFullYear();
                        var month2 = date2.getMonth()+1;
                        if(day2<10){
                            day2='0'+day2;
                        }
                        if(month2<10){
                            month2='0'+month2;
                        }
                        dateEnrStr = month2+"/"+day2+"/"+year2;

                    //last activity date
                    if(o.last_activity_at == null){
                        dateStr = "None";
                    }else{
                        var date = new Date(o.last_activity_at);
                        var day = date.getDate();
                        var year = date.getFullYear();
                        var month = date.getMonth()+1;
                        if(day<10){
                            day='0'+day;
                        }
                        if(month<10){
                            month='0'+month;
                        }
                        dateStr = month+"/"+day+"/"+year;
                    }

                    toAppend += '<tr><td><input type="checkbox" id="'+o.id+'" name="students" value="'+o.id+'"></td><td>'+o.user.sortable_name+'</td><td>'+stuSectionName+'</td><td>'+dateEnrStr+'</td><td>'+dateStr+'</td></tr>';
                });
                $('#table_header').append(toAppend);
            }
        });
    }
    function deleteEnrollments(){
        $.each(array, function(index,item){
            var stuID = item;
            var url = "/api/v1/courses/"+courseID+"/enrollments/"+stuID+"?task=delete";
            $.ajax({
                'async': false,
                'type': "DELETE",
                'global': true,
                'dataType': 'JSON',
                'data': JSON.stringify(),
                'contentType': "application/json",
                'url': url,
                'success': open_success_dialog
            });
            console.log(stuID);
        });
        window.location.reload(true);
    }



    function createDialog() {
        var el = document.querySelector('#events_dialog');
        if (!el) {
            el = document.createElement('div');
            el.id = 'events_dialog';
            //Events Table
            var table = document.createElement('TABLE');
            table.id = 'table_header';
            table.style.width = '100%';
            table.classList.add("ic-Table", "ic-Table--hover-row", "ic-Table--striped");
            el.appendChild(table);
            var tr = document.createElement('TR');
            table.appendChild(tr);
            var th = document.createElement('TH');
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'select-all';
            input.id = 'select-all';
            input.onchange = setEvents;
            th.appendChild(input);
            th.classList.add('ic-Checkbox-group');
            tr.appendChild(th);
            th = document.createElement('TH');
            th.textContent = 'Student Name';
            th.onmouseover= function(){
                this.style.cursor='pointer';
            }
            th.onclick = function (){
                sortTable(1);
            }
            tr.appendChild(th);
            th = document.createElement('TH');
            th.textContent = 'Section';
            th.onmouseover= function(){
                this.style.cursor='pointer';
            }
            th.onclick = function (){
                sortTable(2);
            }
            tr.appendChild(th);
            th = document.createElement('TH');
            th.textContent = 'Enrollment Date';
            th.onmouseover= function(){
                this.style.cursor='pointer';
            }
            th.onclick = function (){
                sortTable(3);
            }
            tr.appendChild(th);
            th = document.createElement('TH');
            th.textContent = 'Last Activity';
            th.onmouseover= function(){
                this.style.cursor='pointer';
            }
            th.onclick = function (){
                sortTable(4);
            }
            tr.appendChild(th);
            var tbody = document.createElement('tbody');
            tbody.id = 'inner_table';
            tbody.onchange= setEvents;
            table.appendChild(tbody);
            var hr = document.createElement('HR');
            el.appendChild(hr);
            var incrButton = document.createElement('button');
            incrButton.classList.add('Button','button-primary','element_toggler');
            incrButton.type = 'button';
            incrButton.id = 'moreStu';
            incrButton.value = 0;
            var icon = document.createElement('i');
            icon.classList.add('icon-user');
            incrButton.appendChild(icon);
            var txt = document.createTextNode(' Add More');
            incrButton.appendChild(txt);
            incrButton.addEventListener('click', getStudents);
            el.appendChild(incrButton);

            //message flash
            var msg = document.createElement('div');
            msg.id = 'events_msg';
            //msg.classList.add('ic-flash-warning');
            msg.style.display = 'none';
            el.appendChild(msg);
            var parent = document.querySelector('body');
            parent.appendChild(el);
        }
        $('#select-all').click(function(event) {
            var state = this.checked; $(':checkbox').each(function() { this.checked = state; });
        });
    }


    function setEvents() {
        array = $.map($('input[name="students"]:checked'), function(c){return c.value; });
    }
    function openDialog() {
        try {
            getSections();
            createDialog();
            $('#events_dialog').dialog({
                'title' : 'Manage Student Enrollments',
                'autoOpen' : false,
                'closeOnEscape': false,
                'open': function () { $(".ui-dialog-titlebar-close").hide(); $(".ui-dialog").css("top", "10px");},
                'buttons' : [  {
                    'text' : 'Cancel',
                    'click' : function() {
                        $(this).dialog('destroy').remove();
                        pageNum=0;
                        errors = [];
                        updateMsgs();
                    }
                },{
                    'text' : 'Remove Students',
                    'class': 'Button Button--primary',
                    'click' : deleteEnrollments

                } ],
                'modal' : true,
                'resizable' : false,
                'height' : '600',
                'width' : '40%',
                'scrollable' : true
            });
            if (!$('#events_dialog').dialog('isOpen')) {
                $('#events_dialog').dialog('open');
            }
        } catch (e) {
            console.log(e);
        }
        getStudents();
    }

    function successDialog(){
        var el = document.querySelector('#success_dialog');
        if (!el) {
            el = document.createElement('div');
            el.id = 'success_dialog';
            var div1 = document.createElement('div');
            div1.classList.add('ic-flash-success');
            el.appendChild(div1);
            var div2 = document.createElement('div');
            div2.classList.add('ic-flash__icon');
            div2.classList.add('aria-hidden="true"');
            div1.appendChild(div2);
            var icon = document.createElement('i');
            icon.classList.add('icon-check');
            div2.appendChild(icon);
            var msg = document.createTextNode("The action completed successfully!");
            div1.appendChild(msg);
            var button = document.createElement('button');
            button.type = 'button';
            button.classList.add("Button", "Button--icon-action", "close_link");
            el.appendChild(button);
            icon = document.createElement('i');
            icon.classList.add('ic-icon-x');
            icon.classList.add('aria-hidden="true"');
            button.appendChild(icon);
            var parent = document.querySelector('body');
            parent.appendChild(el);
        }
    }
    function open_success_dialog(){
        try {
            successDialog();
            $('#success_dialog').dialog({
                'autoOpen' : false,
                'closeOnEscape': false,
                'open': function () { $(".ui-dialog-titlebar").hide(); $(".ui-widget-content").css("background", "rgba(255, 255, 255, 0)"); $(".ui-dialog.ui-widget-content").css("box-shadow", "none");},
                'modal' : true,
                'resizable' : false,
                'height' : 'auto',
                'width' : '40%',
            });
            if (!$('#success_dialog').dialog('isOpen')) {
                $('#success_dialog').dialog('open');
            }
        } catch (e) {
            console.log(e);
        }
    }
    function sortTable(n) {
        var el = document.querySelector('#events_dialog');
        if (el) {
            var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            table = document.getElementById("table_header");
            switching = true;
            // Set the sorting direction to ascending:
            dir = "asc";
            /* Make a loop that will continue until
  no switching has been done: */
            while (switching) {
                // Start by saying: no switching is done:
                switching = false;
                rows = table.rows;
                /* Loop through all table rows (except the
    first, which contains table headers): */
                for (i = 1; i < (rows.length - 1); i++) {
                    // Start by saying there should be no switching:
                    shouldSwitch = false;
                    /* Get the two elements you want to compare,
      one from current row and one from the next: */
                    x = rows[i].getElementsByTagName("TD")[n];
                    y = rows[i + 1].getElementsByTagName("TD")[n];
                    /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
                    if (dir == "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            // If so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            // If so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    // Each time a switch is done, increase this count by 1:
                    switchcount ++;
                } else {
                    /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
                    if (switchcount == 0 && dir == "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        }
    }

    function updateMsgs() {
        var msg = document.getElementById('events_msg');
        if (!msg) {
            return;
        }
        if (msg.hasChildNodes()) {
            msg.removeChild(msg.childNodes[0]);
        }
        if (typeof errors === 'undefined' || errors.length === 0) {
            msg.style.display = 'none';
        } else {
            var div1 = document.createElement('div');
            div1.classList.add('ic-flash-error');
            var div2;
            div2 = document.createElement('div');
            div2.classList.add('ic-flash__icon');
            div2.classList.add('aria-hidden="true"');
            div1.appendChild(div2);
            var icon;
            icon = document.createElement('i');
            icon.classList.add('icon-warning');
            div2.appendChild(icon);
            var ul = document.createElement('ul');
            for (var i = 0; i < errors.length; i++) {
                var li;
                li = document.createElement('li');
                li.textContent = errors[i];
                ul.appendChild(li);
            }
            div1.appendChild(ul);
            var button;
            button = document.createElement('button');
            button.type = 'button';
            button.classList.add("Button", "Button--icon-action", "close_link");
            div1.appendChild(button);
            icon = document.createElement('i');
            icon.classList.add('ic-icon-x');
            icon.classList.add('aria-hidden="true"');
            button.appendChild(icon);
            msg.appendChild(div1);
            msg.style.display = 'inline-block';
        }
    }
})();

////////////////////////////////////////////////////
// START GOOGLE ANALYTICS                         //
////////////////////////////////////////////////////

// Updated Aug 28, 2019
// In Google Analytics you'll need to set up custom dimensions as follows
// Custom Dimension 1 = Canvas User ID --- Scope = User
// Custom Dimension 2 = Archived --- Scope = User
// Custom Dimension 3 = Canvas User Role --- Scope = User
// Custom Dimension 4 = Canvas Course ID --- Scope = Hit
// Custom Dimension 5 = Canvas Course Name --- Scope = Hit
// Custom Dimension 6 = Canvas Sub-Account ID --- Scope = Hit
// Custom Dimension 7 = Canvas Term ID --- = Scope = Hit
// Custom Dimension 8 = Canvas Course Role --- Scope = Hit

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'custom_ga');

function removeStorage(key) {
    try {
        localStorage.removeItem(key);
        localStorage.removeItem(key + '_expiresIn');
    } catch (e) {
        console.log('removeStorage: Error removing key [' + key + '] from localStorage: ' + JSON.stringify(e));
        return false;
    }
    return true;
}

function getStorage(key) {
    var now = Date.now(); //epoch time, lets deal only with integer
    // set expiration for storage
    var expiresIn = localStorage.getItem(key + '_expiresIn');
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    if (expiresIn < now) { // Expired
        removeStorage(key);
        return null;
    } else {
        try {
            var value = localStorage.getItem(key);
            return value;
        } catch (e) {
            console.log('getStorage: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e));
            return null;
        }
    }
}

function setStorage(key, value, expires) {
    if (expires === undefined || expires === null) {
        expires = (24 * 60 * 60); // default: seconds for 6 hours (6*60*60)
    } else {
        expires = Math.abs(expires); //make sure it's positive
    }

    var now = Date.now(); //millisecs since epoch time, lets deal only with integer
    var schedule = now + expires * 1000;
    try {
        localStorage.setItem(key, value);
        localStorage.setItem(key + '_expiresIn', schedule);
    } catch (e) {
        console.log('setStorage: Error setting key [' + key + '] in localStorage: ' + JSON.stringify(e));
        return false;
    }
    return true;
}

async function coursesRequest(courseId) {
    // 
    let response = await fetch('/api/v1/users/self/courses?per_page=100');
    let data = await response.text();
    data = data.substr(9);
    data = JSON.parse(data)
    var stringData = JSON.stringify(data)
    setStorage('ga_enrollments', stringData, null)
    var course = parseCourses(courseId, stringData)
    return course
};

function parseCourses(courseId, courseData) {
    if (courseData != undefined) {
        let data = JSON.parse(courseData);
        //console.log(data)
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]['id'] + " " + courseId)
            if (data[i]['id'] == courseId) {
                return data[i]
            }
        }
    }
    return null
}

function gaCourseDimensions(course) {
    custom_ga('set', 'dimension4', course['id']);
    custom_ga('set', 'dimension5', course['name']);
    custom_ga('set', 'dimension6', course['account_id']);
    custom_ga('set', 'dimension7', course['enrollment_term_id']);
    custom_ga('set', 'dimension8', course['enrollments'][0]['type']);
    custom_ga('send', 'pageview');
    return
}

function googleAnalyticsCode(trackingID) {
    var userId, userRoles, attempts, courseId;
    custom_ga('create', trackingID, 'auto');
    userId = ENV["current_user_id"];
    userRoles = ENV['current_user_roles'];
    custom_ga('set', 'userId', userId);
    custom_ga('set', 'dimension1', userId);
    custom_ga('set', 'dimension3', userRoles);
    courseId = window.location.pathname.match(/\/courses\/(\d+)/);
    if (courseId) {
        courseId = courseId[1];
        attempts = 0;
        try {
            let courses = getStorage('ga_enrollments')
            if (courses != null) {
                var course = parseCourses(courseId, courses);
                if (course === null) {
                    // console.log("course_id not found in cache, retrieving...")
                    coursesRequest(courseId).then(course => {
                        if (course === null) {
                            // console.log("course data not found")
                            custom_ga('set', 'dimension4', courseId);
                            custom_ga('send', 'pageview');
                        } else {
                            gaCourseDimensions(course)
                        }
                    });
                } else {
                    // console.log("course found in cache")
                    gaCourseDimensions(course)
                }
            } else {
                // console.log("cache not found, retrieving cache data")
                coursesRequest(courseId).then(course => {
                    if (course === null) {
                        // console.log("course data not found")
                        custom_ga('set', 'dimension4', courseId);
                        custom_ga('send', 'pageview');
                    } else {
                        gaCourseDimensions(course)
                    }
                });
            }
        } catch (err) {
            attempts += 1;
            if (attempts > 5) {
                custom_ga('set', 'dimension4', courseId);
                custom_ga('send', 'pageview');
                return;
            };
        };
    } else {
        custom_ga('send', 'pageview');
    };
};

googleAnalyticsCode("UA-160989542-1"); // customize google analytics tracking number here

////////////////////////////////////////////////////
//  START FRESHDESK WIDGET CODE                   //
////////////////////////////////////////////////////
window.fwSettings={
	'widget_id':51000000216
};
!function(){
    if("function"!=typeof window.FreshworksWidget){
        var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}
}() 

var FwBootstrap=function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="https://aus-widget.freshworks.com/widgetBase/",n(n.s=0)}([function(t,e,n){t.exports=n(2)},function(t,e){t.exports="https://aus-widget.freshworks.com/widgetBase/static/media/frame.d7ae132c.css"},function(t,e,n){"use strict";n.r(e);var o=["FrustrationTracking","Predictive"],i={boot:"queueComplete",open:"openWidget",close:"closeWidget",destroy:"destroyWidget",identify:"identifyFormFields",prefill:"prefillFormFields",clear:"clearFormFields",hide:"hideWidget",hideLauncher:"hideLauncher",showLauncher:"showLauncher",show:"showWidget",setLabels:"setLabels",updateSettings:"updateSettings",updatePreviewSettings:"updatePreviewSettings",reloadComponents:"reloadComponents",authenticate:"authenticate",authenticateCallback:"authenticateCallback",logout:"logout",hideFormFields:"hideFormFields",disable:null,disableFormFields:"disableFormFields"},s={id:1,product_id:1,account_id:1,name:"Help widget",settings:{message:"",button_text:"Help",contact_form:{form_type:2,form_title:"",form_button_text:"Send",form_submit_message:"Thank you for your feedback.",attach_file:!0,screenshot:!0,captcha:!1},appearance:{position:1,offset_from_right:30,offset_from_left:30,offset_from_bottom:30,theme_color:"#2392ec",button_color:"#16193e"},components:{contact_form:!0,solution_articles:!0},predictive_support:{welcome_message:"",message:"We noticed youâ€™re stuck. Tell us what you were trying to accomplish, and our support team will reach out to you as soon as possible.",success_message:"Thanks. We'll be in touch!",domain_list:["freshpo.com"]},hide_launcher_bydefault:!0},active:!0,updated_at:"2018-10-01T14:16:05+05:30",account_url:"https://localhost.freshdesk-dev.com",languages:{primary:"en",supported:["ca","cs","da","de","es-LA","es","et","fi","fr","hu","id","it","ja-JP","ko","nb-NO","nl","pl","pt-BR","pt-PT","ru-RU","sv-SE","sk","sl","tr","vi","zh-CN","uk","th","ro","zh-TW","lv-LV","bs","bg","hr","el","ms","lt","sr"]}};function r(){return window.fwSettings&&window.fwSettings.preview}function a(t,e){return t.indexOf(e)>=0}var c={init:function(){var t=window.fwSettings.widget_id;if(t)if(this.origin=window.location.origin,r()){var e=s;e.id=t,this.initWidget(e)}else{var n="".concat("https://aus-widget.freshworks.com","/widgets/").concat(t,".json?randomId=").concat(Math.random());this.fetchSettings(n,this.initWidget.bind(this))}},fetchSettings:function(t,e){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&200===n.status&&e(function(t){try{return JSON.parse(t)}catch(e){return t}}(n.response))},n.open("get",t),n.responseType="json",n.send()},showWidget:function(t){var e=!1,n=t.meta,o=t.settings,i=t.components;return(i||o.components)&&["contact_form","solution_articles","frustration_tracking","predictive_support"].forEach(function(t){var s=n&&n.data_version&&i?i[t]&&i[t].enabled:o.components[t];e=e||Boolean(s)}),e},initWidget:function(t){var e;null!=(e=t)&&0!==Object.keys(e).length&&t&&this.showWidget(t)&&(this.options=t,window.fwSettings.originUrl=this.origin,window.fwSettings.options=t,this.createMountPoint(),this.loadIFrame(),this.loadJS())},createMountPoint:function(){var t=document.createElement("div");t.id="freshworks-container",t.style.width="0px",t.style.height="0px",t.style.bottom="0px",t.style.right="0px",t.style.zIndex=Number.MAX_SAFE_INTEGER,t.setAttribute("data-html2canvas-ignore",!0),document.body.appendChild(t);var e=n(1),o=document.createElement("link");o.id="freshworks-frame",o.rel="stylesheet",o.href=e,document.head.appendChild(o)},loadIFrame:function(){var t=document.createElement("iframe");t.setAttribute("title","FreshworksWidget"),t.setAttribute("id","freshworks-frame"),t.setAttribute("data-html2canvas-ignore",!0),t.style.display="none",t.onload=function(){var e=document.createElement("link");e.setAttribute("rel","preconnect"),e.setAttribute("href","https://aus-widget.freshworks.com/widgetBase"),t.contentDocument.head.appendChild(e)},document.body.appendChild(t),this._frame=t;var e=t.contentDocument||t.document;e.open();var n='<script src="'.concat("https://aus-widget.freshworks.com/widgetBase",'/widget.js" async defer><\/script>');e.write(n),e.close(),window.addEventListener?window.addEventListener("message",this.handleMessage.bind(this),!0):window.attachEvent("message",this.handleMessage.bind(this),!0)},loadJS:function(){if(this.isFrustrationTrackingEnabled()){var t=this.frustrationTrackingData();if(t&&!window.FM&&!r()){var e=document.createElement("script");e.src="".concat("https://cdn.freshmarketer.com","/").concat(t.org_id,"/").concat(t.project_id,".js"),e.async=!0,document.body.appendChild(e)}}},helpWidgetMethods:function(t,e,n){if(t&&c[t]&&a(Object.keys(i),t))return c[t](e,n)},widgetRenderComplete:function(){var t=window.FreshworksWidget&&window.FreshworksWidget.q||[];window.FreshworksWidget=this.helpWidgetMethods,t.forEach(function(t){window.FreshworksWidget.apply(null,t)}),this.postMessage(i.boot)},handleMessage:function(t){var e=t.data,n=e.eventName,o=e.data;(n||"function"==typeof this[n])&&this[n](o)},postMessage:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._frame.contentWindow.postMessage({eventName:t,data:e},a(this.origin,"file://")?null:this.origin)},boot:function(){this._frame.contentWindow.Widget.mount(this.origin),this.postMessage(i.boot)},isFrustrationTrackingEnabled:function(){var t=this.options,e=t.meta,n=t.settings,o=t.components;return e&&e.data_version&&o?o.frustration_tracking&&Boolean(o.frustration_tracking.enabled):Boolean(n.components.predictive_support)},frustrationTrackingData:function(){var t=this.options,e=t.meta,n=t.settings,o=t.freshmarketer;return e&&e.data_version?o:n.freshmarketer},open:function(t,e){var n=(t||{}).widgetType;if(t&&n&&a(o,n)){if(!this.isFrustrationTrackingEnabled()&&!r())return;this._frame.contentWindow.Widget.el||this._frame.contentWindow.Widget.mount(this.origin,t.widgetType)}this.postMessage(i.open,{cardType:t,data:e})},close:function(){this.postMessage(i.close)},prefill:function(t,e){this.postMessage(i.prefill,{formName:t,formFields:e})},identify:function(t,e){this.postMessage(i.identify,{formName:t,formFields:e})},disable:function(t,e){this.postMessage(i.disableFormFields,{formName:t,formFields:e})},clear:function(t){this.postMessage(i.clear,{formName:t})},hide:function(t,e){t?e?this.postMessage(i.hideFormFields,{formName:t,formFields:e}):"launcher"===t&&this.postMessage(i.hideLauncher):this.postMessage(i.hide)},show:function(t){"launcher"===t?this.postMessage(i.showLauncher):this.postMessage(i.show)},setLabels:function(t){this.postMessage(i.setLabels,t)},updateSettings:function(t){this.postMessage(i.updateSettings,t)},updatePreviewSettings:function(t){this.postMessage(i.updatePreviewSettings,t)},reloadComponents:function(){this.postMessage(i.reloadComponents)},destroy:function(){this._frame.contentWindow.Widget.unmount()},authenticate:function(t){var e=t.callback,n=t.token,o=e&&"function"==typeof e,s="function"==typeof this.authenticateCallback,r=o||s;o&&(this.authenticateCallback=e),this.postMessage(i.authenticate,{token:n,hasCallback:r})},logout:function(){this.postMessage(i.logout)}};c.init()}]);