import Image from 'next/image'

/**
 * Background flying doves — the brand's gold dove artwork, animated so it
 * genuinely flaps.
 *
 * A still image cannot read as flight by squashing or bobbing it, because the
 * wings never move relative to the body. So the one PNG is layered three
 * times and clipped into body, left wing and right wing. The wings then swing
 * down from their own shoulders (with foreshortening, as a wing does when it
 * sweeps towards you) while the body lifts on each downstroke.
 *
 * Clip polygons are in percentages of the 1549×1400 artwork. Each wing's clip
 * overlaps the body by a few pixels, so no seam opens up mid-stroke.
 *
 * Decorative and pointer-transparent. Under prefers-reduced-motion the
 * animations collapse and the doves stay off-stage.
 */

export const DOVE_SRC = '/images/dove-gold.png'
export const DOVE_W = 1549
export const DOVE_H = 1400

const CLIP_LEFT_WING = 'polygon(0 0, 50.1% 0, 50.1% 38.6%, 48.5% 45.7%, 44% 56.4%, 0 57.2%)'
const CLIP_RIGHT_WING =
  'polygon(59% 0, 100% 0, 100% 59.3%, 57.9% 57.5%, 56.9% 45.7%, 57.4% 40.4%, 61% 36.8%, 62.6% 36.1%, 59.4% 31.4%)'
const CLIP_BODY =
  'polygon(49% 0, 60% 0, 60.4% 31.4%, 63.6% 36.1%, 62% 36.8%, 58.4% 40.4%, 57.9% 45.7%, 58.9% 57.5%, 100% 59.3%, 100% 100%, 0 100%, 0 57.1%, 42.9% 56.4%, 47.5% 45.7%, 49.1% 38.6%)'

function Layer({ clip, className, width }: { clip: string; className?: string; width: number }) {
  return (
    <Image
      src={DOVE_SRC}
      alt=""
      width={DOVE_W}
      height={DOVE_H}
      sizes={`${width}px`}
      className={`absolute inset-0 w-full h-full ${className ?? ''}`}
      style={{ clipPath: clip, WebkitClipPath: clip }}
    />
  )
}

export function FlappingDove({
  width,
  intensity = 1,
  className,
}: {
  width: number
  /** Final opacity. Set here, not on the flight wrapper, whose opacity the
      flight animation owns for its fade in and out. */
  intensity?: number
  className?: string
}) {
  return (
    <span
      className={`dove-flap relative block dove-soft-glow ${className ?? ''}`}
      style={{ width, aspectRatio: `${DOVE_W} / ${DOVE_H}`, opacity: intensity }}
    >
      <span className="dove-flap-body absolute inset-0 block">
        <Layer clip={CLIP_BODY} width={width} />
        <Layer clip={CLIP_LEFT_WING} width={width} className="dove-flap-wing--left" />
        <Layer clip={CLIP_RIGHT_WING} width={width} className="dove-flap-wing--right" />
      </span>
    </span>
  )
}

export function FlyingDoves({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      {/* Same direction, separate altitude bands, half a loop apart — the two
          are never on screen together, so they cannot cross. */}
      <div className="dove-flight dove-flight--a">
        <FlappingDove width={130} intensity={0.9} />
      </div>
      <div className="dove-flight dove-flight--b">
        <FlappingDove width={92} intensity={0.65} className="dove-flap--slow" />
      </div>
    </div>
  )
}

export default FlyingDoves
