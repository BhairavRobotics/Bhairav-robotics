import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Gauge,
  PictureInPicture2,
} from "lucide-react";

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

const VideoPlayer = forwardRef(
  (
    {
      src,
      poster,
      className = "",
      autoPlay = false,
      loop = false,
      muted = false,
      playsInline = true,
      videoRef,
      ariaLabel,
    },
    forwardedRef
  ) => {
    const innerVideoRef = useRef(null);
    const videoElement = videoRef || innerVideoRef;
    const containerRef = forwardedRef;

    const [playing, setPlaying] = useState(autoPlay);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(muted ? 0 : 1);
    const [isMuted, setIsMuted] = useState(muted);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [speedOpen, setSpeedOpen] = useState(false);

    const togglePlay = useCallback(() => {
      const v = videoElement.current;
      if (!v) return;
      if (v.paused) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }, [videoElement]);

    const toggleMute = useCallback(() => {
      const v = videoElement.current;
      if (!v) return;
      v.muted = !v.muted;
      setIsMuted(v.muted);
    }, [videoElement]);

    const setPlaybackVolume = useCallback(
      (value) => {
        const v = videoElement.current;
        if (!v) return;
        v.muted = value === 0;
        v.volume = value;
        setVolume(value);
        setIsMuted(value === 0);
      },
      [videoElement]
    );

    const seekTo = useCallback(
      (value) => {
        const v = videoElement.current;
        if (!v) return;
        v.currentTime = value;
        setCurrentTime(value);
      },
      [videoElement]
    );

    const setPlaybackSpeed = useCallback(
      (rate) => {
        const v = videoElement.current;
        if (v) v.playbackRate = rate;
        setSpeed(rate);
        setSpeedOpen(false);
      },
      [videoElement]
    );

    const toggleFullscreen = useCallback(() => {
      const el = containerRef?.current;
      if (!el) return;
      if (!document.fullscreenElement) {
        el.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    }, [containerRef]);

    const togglePip = useCallback(() => {
      const v = videoElement.current;
      if (!v) return;
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture?.().catch(() => {});
      } else if (v.requestPictureInPicture) {
        v.requestPictureInPicture().catch(() => {});
      }
    }, [videoElement]);

    useEffect(() => {
      const v = videoElement.current;
      if (!v) return;

      const onTimeUpdate = () => setCurrentTime(v.currentTime);
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      const onLoadedMeta = () => setDuration(v.duration);
      const onVolumeChange = () => {
        setVolume(v.volume);
        setIsMuted(v.muted);
      };
      const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));

      v.addEventListener("timeupdate", onTimeUpdate);
      v.addEventListener("play", onPlay);
      v.addEventListener("pause", onPause);
      v.addEventListener("loadedmetadata", onLoadedMeta);
      v.addEventListener("volumechange", onVolumeChange);
      document.addEventListener("fullscreenchange", onFsChange);

      return () => {
        v.removeEventListener("timeupdate", onTimeUpdate);
        v.removeEventListener("play", onPlay);
        v.removeEventListener("pause", onPause);
        v.removeEventListener("loadedmetadata", onLoadedMeta);
        v.removeEventListener("volumechange", onVolumeChange);
        document.removeEventListener("fullscreenchange", onFsChange);
      };
    }, [videoElement]);

    return (
      <div
        ref={containerRef}
        className="video-player group relative h-full w-full"
      >
        <video
          ref={videoElement}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          className={`pointer-events-none h-full w-full object-contain ${className}`}
          aria-label={ariaLabel}
        />

        <div
          className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-3 pt-10 transition-opacity"
        >
            {/* Progress bar */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              onMouseDown={() => setShowControls(true)}
              aria-label="Seek"
              className="mb-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-white"
              style={{
                background: `linear-gradient(to right, #fff ${(duration ? currentTime / duration : 0) * 100}%, rgba(255,255,255,0.25) 0%)`,
              }}
            />

            <div className="flex items-center justify-between gap-2 text-white">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  className="rounded p-1.5 text-white transition hover:bg-white/20"
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="rounded p-1.5 text-white transition hover:bg-white/20"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => setPlaybackVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="hidden h-1.5 w-16 cursor-pointer appearance-none rounded-full bg-white/25 accent-white md:block"
                />

                <span className="ml-1 text-[11px] font-medium tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSpeedOpen((o) => !o)}
                    aria-label="Playback speed"
                    aria-expanded={speedOpen}
                    className="flex items-center gap-1 rounded p-1.5 text-white transition hover:bg-white/20"
                  >
                    <Gauge size={16} />
                    <span className="text-[11px] font-semibold">{speed}x</span>
                  </button>
                  {speedOpen && (
                    <div className="absolute bottom-9 right-0 flex flex-col rounded border border-border bg-background p-1 shadow-xl">
                      {SPEEDS.map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setPlaybackSpeed(rate)}
                          className={`rounded px-3 py-1 text-left text-xs transition hover:bg-primary/10 ${
                            rate === speed
                              ? "font-bold text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={togglePip}
                  aria-label="Picture in picture"
                  className="rounded p-1.5 text-white transition hover:bg-white/20"
                >
                  <PictureInPicture2 size={17} />
                </button>

                {containerRef?.current && (
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    className="rounded p-1.5 text-white transition hover:bg-white/20"
                  >
                    {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                  </button>
                )}
              </div>
            </div>
          </div>

        <div
          className="absolute inset-0 z-[5]"
          onClick={togglePlay}
        />
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
