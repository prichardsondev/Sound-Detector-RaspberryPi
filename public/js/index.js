let socket = io();

let soundCount = 0;
let maxSoundCount = 1000;

socket.on('statedata', data => {

    Plotly.extendTraces('soundChart', {x:[[cTime()]], y:[[data.sound]]},[0]);

    //comment below to stop chart slide once maxSoundCount reached
    //slide
    soundCount++;
    if(soundCount > maxSoundCount)
        Plotly.relayout('soundChart', {
            xaxis: {
                range:[soundCount-maxSoundCount, soundCount]
            }
        });
    //slide
});

var sound = {
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines'
  };
  
  var data = [sound];

  var layout = {
    title: 'Realtime Sound Plot',
    xaxis: {
      title: 'Timestamp'
    },
    yaxis: {
      title: 'Sound Level'
    }
  };
  
  Plotly.newPlot('soundChart', data, layout);

  let cTime = () => {
    let currentDate = new Date();
    return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  }