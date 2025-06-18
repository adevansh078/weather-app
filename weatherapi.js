const api="zaf1PG6f9yXOuqHNysdeiFqRCt6SkwRg";
const weatherapi=async function(id){
    const base="http://dataservice.accuweather.com/currentconditions/v1/";
    const query=`${id}?apikey=${api}`;
    const response=await fetch(base+query);
    const data=await response.json();
    return data[0];
}
const cityapi= async function(city){
    const base="http://dataservice.accuweather.com/locations/v1/cities/search";
    const query=`?apikey=${api}&q=${city}`;
    const response= await fetch(base +query);
    const data= await response.json();
    return data[0];
    
}

cityapi("surat").then(function(data){
    return weatherapi(data.Key);
}).then(function(data){
    console.log(data);
}).catch(function(err){
    console.log(err);
})
