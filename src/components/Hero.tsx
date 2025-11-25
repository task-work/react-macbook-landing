import { useEffect, useRef } from "react";

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        //让视频的播放速度快一倍
        if(videoRef.current) videoRef.current.playbackRate = 2;
    }, []);

  return (
    <section id="hero">
        <div>
            <h1>MacBook Pro</h1>
            <img src="/title.png" alt="MackBook Title" />
        </div>
        {/* {autoPlay: 自动播放， muted: 静音， playsInline: 不显示额外的设置(音量、快进等)} */}
        <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />
        <button>Buy</button>
        <p>From $1599 or $133/mo for 12 months</p>
    </section>
  )
}

export default Hero;