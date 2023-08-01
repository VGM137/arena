window.onload = () => {

  let videos = document.querySelectorAll('.full-screen__video')
  let playerWrapper = document.querySelector('.full-screen__player')

  let media = document.querySelector("video");
  const controls = document.querySelector(".controls");

  const play = document.querySelector(".play");
  const stop = document.querySelector(".stop");
  const rwd = document.querySelector(".rwd");
  const fwd = document.querySelector(".fwd");

  const timerWrapper = document.querySelector(".timer");
  const timer = document.querySelector(".timer span");
  const timerBar = document.querySelector(".timer div");

  let seeOtherView = document.querySelector('#otherView')
  seeOtherView.onclick = (e) => openViews()
  let views = document.querySelector('.other-views__container')

  let viewsItem = document.querySelectorAll('.other-view__image')
  viewsItem.forEach(view => view.onclick = (e) => handleChangeView(e))

  let currentMax = 0.8

  const openViews = () => {
    if(views.classList.contains('display-none')) {
      currentMax = 0.5
      views.classList.remove('display-none')
    } else {
      currentMax = 0.8
      views.classList.add('display-none');
    }
  }

  const handleChangeView = (e) => {
    let videos = document.querySelectorAll('.full-screen__video')
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
    let url = e.target.dataset.url
    let newVideo = document.createElement('video')
    newVideo.classList.add('full-screen__video')
    newVideo.muted
    newVideo.controls
    let newSource = `<source src=${url}></source>`
    newSource.src = url
    newSource.type= "video/mp4"
    newVideo.innerHTML = newSource

    media = newVideo

    playerWrapper.insertBefore(newVideo, videos[0])
    videos[0].remove()
    /* videos[0].querySelector('source').src = "blob:https://player.vimeo.com/09caa49a-4e44-4e75-8064-b4db64c10c21" */
  }

  media.removeAttribute("controls");
  controls.style.visibility = "visible";

  play.addEventListener("click", playPauseMedia);

  function playPauseMedia() {
    if (media.paused) {
      
      media.play();
    } else {
      
      media.pause();
    }
  }

  stop.addEventListener("click", stopMedia);
  media.addEventListener("ended", stopMedia);

  function stopMedia() {
    media.pause();
    media.currentTime = 0;
    
  }

  rwd.addEventListener("click", mediaBackward);
  fwd.addEventListener("click", mediaForward);

  let intervalFwd;
  let intervalRwd;

  function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove("active");

    if (rwd.classList.contains("active")) {
      rwd.classList.remove("active");
      clearInterval(intervalRwd);
      media.play();
    } else {
      rwd.classList.add("active");
      media.pause();
      intervalRwd = setInterval(windBackward, 200);
    }
  }

  function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove("active");

    if (fwd.classList.contains("active")) {
      fwd.classList.remove("active");
      clearInterval(intervalFwd);
      media.play();
    } else {
      fwd.classList.add("active");
      media.pause();
      intervalFwd = setInterval(windForward, 200);
    }
  }

  function windBackward() {
    if (media.currentTime <= 3) {
      rwd.classList.remove("active");
      clearInterval(intervalRwd);
      stopMedia();
    } else {
      media.currentTime -= 3;
    }
  }

  function windForward() {
    if (media.currentTime >= media.duration - 3) {
      fwd.classList.remove("active");
      clearInterval(intervalFwd);
      stopMedia();
    } else {
      media.currentTime += 3;
    }
  }

  media.addEventListener("timeupdate", setTime);

  function setTime() {
    const minutes = Math.floor(media.currentTime / 60);
    const seconds = Math.floor(media.currentTime - minutes * 60);

    const minuteValue = minutes.toString().padStart(2, "0");
    const secondValue = seconds.toString().padStart(2, "0");

    const mediaTime = `${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;

    const barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = `${barLength}px`;
  }

  rwd.classList.remove("active");
  fwd.classList.remove("active");
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);

  let playerControls = document.querySelector('#controls')
  const playerControlsHeight = playerControls.clientHeight
  

  let optionsBar = document.querySelector('.options-bar')

  document.onclick = function (e) {
    console.log(e.x, e.y);
    
    let touch = {
      x: e.x,
      y: e.y,
    } 

    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    
    let openOptionsHeight =  windowHeight*currentMax
    let optionsMaxHeight = openOptionsHeight+playerControlsHeight

    if(touch.y > openOptionsHeight && touch.y < optionsMaxHeight){
      openControls(playerControls)
    }
    
    if(touch.y < openOptionsHeight){
      
      if(optionsBar.dataset.is === 'showing'){
        currentMax = .90
        optionsBar.dataset.is = 'hidden'
        
        return closeOptions(optionsBar)
      }
      
      currentMax = .80
      optionsBar.dataset.is === 'hidden'
      optionsBar.dataset.is = 'showing'
      return openOptions(optionsBar)
    }

    automaticFadeOut(playerControls)
  };

  const openControls = (playerControls) => {
    playerControls.classList.remove('display-none')
  }
  const closeControls = (playerControls) => {
    playerControls.classList.add('display-none')
  }

  const openOptions = (playerOptions) => {
    let playerContainer = document.querySelector('#playerContainer')
    playerContainer.classList.add('full-screen-showing')
    playerContainer.classList.remove('full-screen-full')

    playerOptions.classList.remove('show-player__options')
  }
  const closeOptions = (playerOptions) => {
    let playerContainer = document.querySelector('#playerContainer')
    playerContainer.classList.remove('full-screen-showing')
    playerContainer.classList.add('full-screen-full')

    views.classList.add('display-none');
    playerOptions.classList.add('show-player__options')
  }

  const automaticFadeOut = playerControls => {
    /* setTimeout(() => {
      closeControls(playerControls)
    }, 7000) */
  }
  automaticFadeOut(playerControls)

}


