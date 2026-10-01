// The winking-eyes intro. Pure CSS: it fades out by itself after the wink,
// and a tiny inline script shows it only on the home page, once per visit.

const brow = (
  <>
    <path d="M-48 8 C-26 -13, 22 -17, 48 3" />
    <path className="brow-hair" d="M-36 4 C-32 -4, -28 -7, -22 -10" />
    <path className="brow-hair" d="M-19 -5 C-13 -12, -7 -14, 0 -15" />
    <path className="brow-hair" d="M3 -10 C11 -14, 17 -14, 23 -12" />
    <path className="brow-hair" d="M26 -7 C34 -7, 40 -4, 46 0" />
  </>
);

const eye = (
  <>
    <path className="eye-shadow" d="M-52 -10 C-28 -44, 34 -44, 68 -12 C38 -32, -22 -34, -52 -10 Z" />
    <circle className="eye-iris" cx="2" cy="-2" r="19" />
    <circle className="eye-pupil" cx="2" cy="-2" r="8" />
    <circle className="eye-glint" cx="9" cy="-10" r="4" />
    <path className="eye-outline" d="M-58 -2 C-30 28, 32 28, 60 0" />
    <path className="eye-liner" d="M-58 -2 C-32 -38, 32 -38, 60 0 L86 -20 C70 -11, 44 -27, 12 -34 C-16 -40, -38 -23, -58 -2 Z" />
    <path className="eye-lash" d="M30 -33 L40 -49" />
    <path className="eye-lash" d="M46 -27 L60 -41" />
    <path className="eye-lash" d="M59 -18 L75 -30" />
  </>
);

const spline = ".4 0 .6 1";

export const loaderScript = `try{var d=document.documentElement;d.classList.add('js');if(location.pathname!=='/'||sessionStorage.getItem('seen'))d.setAttribute('data-seen','');else sessionStorage.setItem('seen','1')}catch(e){}`;

export default function Loader() {
  return (
    <div className="loader pointer-events-none fixed inset-0 z-[999] flex items-center justify-center bg-white" aria-hidden="true">
      <svg className="h-[86px] w-[188px] overflow-visible sm:h-[108px] sm:w-[236px]" viewBox="0 0 360 165">
        <g transform="translate(100,50) scale(-1,1)">{brow}</g>
        <g transform="translate(100,108) scale(-1,1)">{eye}</g>
        <g transform="translate(260,50)">
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; 0 0; 0 5; 0 -4; 0 0; 0 0"
              keyTimes="0; 0.22; 0.44; 0.66; 0.86; 1" dur="0.8s" calcMode="spline"
              keySplines={Array(5).fill(spline).join("; ")} repeatCount="1" fill="freeze" />
            {brow}
          </g>
        </g>
        <g transform="translate(260,108)">
          <g>
            <animateTransform attributeName="transform" type="scale" values="1 1; 1 1; 1 0.05; 1 1; 1 1"
              keyTimes="0; 0.24; 0.44; 0.74; 1" dur="0.8s" calcMode="spline"
              keySplines={Array(4).fill(spline).join("; ")} repeatCount="1" fill="freeze" />
            {eye}
          </g>
        </g>
      </svg>
    </div>
  );
}
