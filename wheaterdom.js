const cityform=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('img.time')
const day=document.querySelector('.icon img')

const updateui=function(data){
    const citydata=data.destcity;
    const weatherdata=data.response;

    details.innerHTML=`<h5 class="my-3">${citydata.EnglishName}</h5>
            <div class="my-3">${weatherdata.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weatherdata.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>`;
     if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
     }      
     let iconsrc=`icons/${weatherdata.WeatherIcon}.svg`;
     day.setAttribute('src',iconsrc);

     let timesrc=null;
     if(weatherdata.IsDayTime==true){
        timesrc="day.svg"
     }
     else{
        timesrc="night.svg";
     }

     time.setAttribute('src',timesrc);
     

}
const update=async  function(city){
    const destcity=await cityapi(city);
    const response=await weatherapi(destcity.Key);
    return {
        destcity : destcity,
        response:  response

    };
}


cityform.addEventListener("submit",function(e){
    e.preventDefault();
    const city=cityform.city.value.trim();
    cityform.reset();

    update(city).then(function(data){
        updateui(data);
    }).catch(function(err){
        console.log(err);
    })
})