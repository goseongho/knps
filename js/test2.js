document.addEventListener('DOMContentLoaded', function() {
  // 메인 네비게이션 요소선택
  const mainGnb = document.querySelectorAll('#main_gnb>ul>li');

  // 각 메뉴에 이벤트 리스너를 추가
  mainGnb.forEach(function(item) {
    // 마우스 오버 시 서브 메뉴를 보여주기
    item.addEventListener('mouseover', function() {
      const gnbSunInner = this.querySelector('.gnb_sunInner');
      if (gnbSunInner) {
        slideDown(gnbSunInner);
      }
    });
    // 마우스 아웃 시 서브 메뉴를 숨기기
    item.addEventListener('mouseout', function() {
      const gnbSunInner = this.querySelector('.gnb_sunInner');
      if (gnbSunInner) {
        slideUp(gnbSunInner);
      }
    });
  });

  // 각 서브 메뉴 요소를 배열로 가져오자
  const subMenus = [
    ".testsub00", ".testsub01", ".testsub02", ".testsub03", ".testsub04", ".testsub05", ".testsub06"
  ];

  // 각 메뉴에 대한 이벤트 리스너를 추가하고
  for (let i = 0; i < mainGnb.length; i++) {
    const gnbNum = "gnb_num0" + i;
    const index = i < 10 ? "0" + i : i;
    const currentSubMenu = document.querySelector(subMenus[i]);

    // 해당 클래스를 포함하는 경우 이벤트 리스너를 추가
    if (mainGnb[i].classList.contains(gnbNum)) {
      mainGnb[i].addEventListener('mouseover', function() {
        if (currentSubMenu) {
          slideDown(currentSubMenu);
        }
      });

      mainGnb[i].addEventListener('mouseout', function() {
        if (currentSubMenu) {
          slideUp(currentSubMenu);
        }
      });
    }
  }
});

// 요소를 슬라이드 다운시킨다...블록
function slideDown(element) {
  element.style.display = 'block';
  
}

// 요소를 숨긴다
function slideUp(element) {
  element.style.display = 'none';
}

// index.js
// tapmenu
/*
모든 content 영역을 숨긴다.
제목을 클릭시 해당 아이디 값과 같은 콘텐츠만 보여진다
*/ 
let contentDiv = document.querySelectorAll('.content > div')
console.log('contentDiv');
contentDiv.forEach(function(div){
  div.style.display='none';
})
//첫번째 콘텐츠 영역만 보여주기
document.getElementById('content1').style.display='block'


let titleLink = document.querySelectorAll('.title a')
titleLink.forEach(function(link){
  link.addEventListener('click', function(e){
    //클릭한 링크의 href속성을 가져온다
    let tab = this.getAttribute('href')
    //모든 div 숨겨야됨
    contentDiv.forEach(function(div){
      div.style.display='none';
    });
    // 클릭한 링크의 href해당하는 요소만 보이게 설정
    document.querySelector(tab).style.display='block';

    //a의 on 클래스 모두 제거
    titleLink.forEach(function(link){
      link.classList.remove('on')
    });
    //클릭한 그것만 클래스 추가
    this.classList.add('on');
  })
})
// sns
window.addEventListener('scroll', function(){
  // 현재 스크롤 위치를 계산
  let scrollTop = window.pageYOffset;
  console.log(scrollTop);
  //스크롤 위치에 따른 이벤트를 추가 삭제
  //스크롤 위치가 200보다 크면 실행
  if(scrollTop > 200){
    let quickElem = document.querySelector('.quick');

      quickElem.style.transition = 'top 0.2s';
      quickElem.style.top = scrollTop + 100 + 'px';
    }else{
      //스크롤 위치가 200보다 작거나 같으면 실행
 
        quickElem.style.top = '150px'
    }
})

// banner 02
/*
1. 버튼을 클릭시 해당 아이디와 같은 컨텐츠가 보인다.
2. 버튼을 클릭시 클래스가 배경검정, 글자 흰색
3. 다른 버튼을 누르면 이전에 보여졌던 클래스는 삭제된다.

선택할 영역을 변수에 담는다.
콘솔에서 확인 한다.
이벤트를 적용시킨다
*/
let tabNav = document.querySelectorAll(".tab_nav a");
// 탭네브 안에 li선택
let tabCon = document.querySelectorAll(".tab_con>div");
// tab_con > div들 선택
//요소의 속성을 가져오는 방법
//getAttribute
//forEach(function(배열요소, 배열인덱스){});
// map(), forEach 배열을 반복시킬 때 사용

//
tabNav.forEach(function(item, idx){
  item.addEventListener('click',function(x){
    showContent(idx);
  })
});

//showContent = 선택된 번호(num)에 따라서 콘텐츠를 보여주는 함수
function showContent(num){
  tabCon.forEach(function(item){
    //모든 콘텐츠 안보이게
    item.style.display='none';
  })
  // 선택한 콘텐츠만 보여줌
  tabCon[num].style.display='block'
 
};
// 메뉴클릭이벤트
tabNav.forEach(function(item, idx){
  item.addEventListener('click',function(x){
    // 모든 탭 버튼에서 액티브 클래스 제거
    tabNav.forEach(function(Nav){
      Nav.classList.remove('active');
    });
    // 선택한 탭에 'active'클래스 추가하고 해당 콘텐츠 보여줌
    showContent(idx);
    item.classList.add('active');
  });
});
  //모든 콘텐츠 숨기고
  //첫번째 콘텐츠는 보여준다
// siwper 정지버튼
