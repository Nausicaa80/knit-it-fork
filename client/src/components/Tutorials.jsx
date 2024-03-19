import React from 'react';

export default function Tutorials() {
  return (
    <div>
      <h2>Tutorials</h2>
      <div className='video-container'>
        {/* Embedding YouTube video using iframe */}
        <div>
          <iframe
            width="560"
            height="315"
            src={'https://www.youtube.com/embed/hM5M2Fu0RtY?si=WTAFrPm7N50E5yw8'}
            title={'YouTube video player'}
            frameBorder= "0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src={'https://www.youtube.com/embed/7ePhLqw6HDM?si=Gs-6esnhcdODljWX'}
            title={'Youtube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src={'https://www.youtube.com/embed/q92bAeVFdao?si=IPV_V9GOLoHT-wFG'}
            title={'Youtube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* Assuming you want to display the same title for all videos */}
        <p>Title for all videos</p>
      </div>
    </div>
  );
}