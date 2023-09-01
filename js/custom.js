window.addEventListener('DOMContentLoaded', () => {



    const ASIDE = document.querySelectorAll('.aside li');
    const SECTION = document.querySelectorAll('.section');

    const COVER_BTN = document.querySelector('.cover .menu');
    const COVER = document.querySelector('.cover');
    const COVER_A = document.querySelectorAll('.cover>ul a');

    const LOGO = document.querySelector('.logo');


    const M_S = document.querySelector('#slide');


    const INTRO = () => {
        const txt = gsap.utils.toArray('.text');

        txt.forEach((it, idx, arry) => {
            const a = it.innerText;
            const t = [...a].map(it => `<span>${it}</span>`).join('');

            it.innerHTML = t;
            const chars = it.querySelectorAll('span');

            gsap.from(chars, {
                // yPercent: 50,
                autoAlpha: 0,
                duration: 1.0,
                repeat: 2,
                repeatDelay: 2,
                //yoyo: true,
                ease: "bounce",
                stagger: {
                    amount: 1,
                    from: "random"
                },
                // scrollTrigger: {
                //     trigger: it,
                //     start: "top center",
                //     //end: "+=400",
                //     toggleActions: "play none play reverse",
                //     markers: 1
                // }
            });
        });




        gsap.fromTo(".air_box", {
            opacity: 0,

            scale: 1.0,

        }, {
            opacity: 1,
            scale: 1,
            delay: 2.5,
        });




        // gsap.from('.air_box', {
        //     y: 100,
        //     autoAlpha: 0,
        //     delay: 3.5,
        //     scale: 1.5,
        //     // repeat: -0,
        //     // repeat: 2,
        //     // repeatDelay: 2,
        //     yoyo: true,

        //     // scaleX: 2,
        //     // transformOrigin: "50% 50%",
        //     // rotate: 150,
        //     duration: 0.8,
        // })
    }




    const FULL = new fullpage('#main', {
        anchors: ['p01', 'p02', 'p03', 'p04', 'footer'],
        // css3: false,
        // scrollOverflow: false, //line-height: 1에서 font-size가 box를 초과할 때 스크롤이 생기는 초기값을 false로 설정함.

        // scrollHorizontally: true,
        controlArrows: false, //슬라이드 화살표 숨김
        loopHorizontal: false, //슬라이드 반복 멈춤

        lazyLoading: false,


        afterLoad: function (origin, destination, direction, trigger) {
            console.log(destination.index, ASIDE[destination.index]);
            ASIDE.forEach(it => it.classList.remove('on'));
            ASIDE[destination.index].classList.add('on');
            SECTION.forEach(it => it.classList.remove('on'));
            SECTION[destination.index].classList.add('on');

            // INTRO();
            if (destination.index == 0) {
                LOGO.classList.add('on');
                setTimeout(INTRO, 1000)
            } else {
                LOGO.classList.remove('on');
            }

        },

        afterSlideLoad: function (section, origin, destination, direction, trigger) {
            // console.log(destination.index, SLIDE_ITM[0]);

            // SLIDE_ITM.forEach(it => it.classList.remove('on'));
            // SLIDE_ITM[destination.index].classList.add('on');

            document.querySelector('.num').innerHTML = `0${destination.index + 1}`;
        },
    });


    //슬라이드에 가로 휠이벤트 달기...
    M_S.addEventListener("wheel", function (e) {
        //e.stopPropagation();
        let delta = e.deltaY;
        console.log(e)
        if (delta < 0) {
            fullpage_api.moveSlideLeft();
        }
        else {
            fullpage_api.moveSlideRight();
        }
    });

    //const BT = document.querySelector('.bars button');

    COVER_BTN.addEventListener('click', function () {
        this.classList.toggle('on');
        this.parentElement.classList.toggle('on');
    })





    // gsap.from('.air_box bottom .right', {
    //     autoAlpha: 0,
    //     delay: 1.5,
    //     scale: 1.5, repeat: -0,
    //     yoyo: true,
    //     // scaleX: 2,
    //     // transformOrigin: "50% 50%",
    //     // rotate: 150,
    //     duration: 0.8,
    // })




    // That(loves).spending
    // 'time'.coding();







    COVER_A.forEach((lnk, idx) => {
        lnk.addEventListener('click', () => {
            COVER.classList.remove('on');
            COVER_BTN.classList.remove('on');
            console.log(idx);
        });
    });

    COVER.addEventListener('wheel', e => {
        //e.preventDefault(); 이벤트 자체를 막음
        e.stopPropagation(); // 이벤트의 전파를 막음.
        console.log(e.deltaY) // 방향이 찍힌다. 
    });


    // 💥탑버튼 작동x

    const TOTOP = document.querySelector('.to_top');
    TOTOP.addEventListener('click', function () {
        gsap.to(window, { scrollTo: 0 })
    })

    const MENU = document.querySelector('.menu');

    MENU.addEventListener('click', function () {
        this.classList.toggle('on');
        COVER.classList.toggle('on');
    })

    // $('.menu').on('click', function () {
    //     $(this).toggleClass('on')
    //     $('.cover').toggleClass('on')
    // });


})


