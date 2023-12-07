/*!
 * Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
//
// Scripts
//


import * as bootstrap from "bootstrap";
import Typed from "typed.js";
import { WOW } from "wowjs";
// window.addEventListener('DOMContentLoaded', event => {
  // 이미지 추가


/* eslint-disable */
export default function initMain() {
  new WOW().init();
  // Activate Bootstrap scrollspy on the main nav element
  const sideNav = document.body.querySelector("#sideNav");
  if (sideNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#sideNav",
      rootMargin: "0px 0px -40%",
    });
  }
  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
  // typed.js
  let typed1 = document.querySelector("#typed1");
  //   type1 있으면 타이핑 객체 생성
  if (typed1 != null) {
    new Typed("#typed1", {
      strings: ["포트폴리오"],
      typeSpeed: 200, // 타이핑 되는 속도
      backSpeed: 200, // 지워지는 속도
      cursorChar: ".",
      loop: true,
    });
  }
  (function ($) {
    // Skills
    $(".skill").waypoint(
      function () {
        $(".progress .progress-bar").each(function () {
          $(this).css("width", $(this).attr("aria-valuenow") + "%");
        });
      },
      { offset: "80%" }
    );
  })(jQuery);
  $(".portfolio-container").imagesLoaded(function () {
    // 필터 선택자
    let portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });
    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("active"); // avtive 클래스 제거
      $(this).addClass("active"); // 현재 클릭한 소제목에 active 클래스 추가
      portfolioIsotope.isotope({ filter: $(this).data("filter") });
    });
  });
}

// });
  