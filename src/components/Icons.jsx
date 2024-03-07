import React from "react";

const Icons = ({ name, width, height, color }) => {
  if (name === "email")
    return (
      <div style={{ color: color }}>
        <svg
          width={width}
          height={height}
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.49414 2.67651H15.5059C16.3297 2.67651 17 3.34679 17 4.17065V12.8294C17 13.6533 16.3297 14.3236 15.5059 14.3236H1.49414C0.670271 14.3236 0 13.6533 0 12.8294V4.17065C0 3.34679 0.670271 2.67651 1.49414 2.67651ZM1.68914 3.67261L1.88856 3.83866L7.90719 8.85037C8.25071 9.13638 8.74936 9.13638 9.09281 8.85037L15.1114 3.83866L15.3109 3.67261H1.68914ZM16.0039 4.39172L11.1001 8.47514L16.0039 11.7388V4.39172ZM1.49414 13.3275H15.5059C15.7465 13.3275 15.9478 13.1559 15.9939 12.9287L10.3014 9.14017L9.73018 9.61583C9.37377 9.9126 8.93685 10.061 8.49997 10.061C8.06308 10.061 7.62619 9.9126 7.26976 9.61583L6.69853 9.14017L1.00605 12.9286C1.05221 13.1559 1.25348 13.3275 1.49414 13.3275ZM0.996094 11.7388L5.89993 8.47517L0.996094 4.39172V11.7388Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  if (name === "login")
    return (
      <div style={{ color: color }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-box-arrow-in-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
          />
          <path
            fillRule="evenodd"
            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
          />
        </svg>
      </div>
    );
  if (name === "logout")
    return (
      <div style={{ color: color }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-box-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
          />
          <path
            fillRule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
          />
        </svg>
      </div>
    );

  if (name === "password")
    return (
      <div style={{ color: color }}>
        <svg
          width={width}
          height={height}
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0032 7.2296V4.53742C13.0104 3.31927 12.5238 2.14798 11.6553 1.29383C10.8155 0.457706 9.71632 0 8.55223 0C8.53421 0 8.51259 0 8.49457 0C6.01142 0.00360399 3.99319 2.03625 3.99319 4.53742V7.2296C3.05616 7.34132 2.3714 8.12699 2.3714 9.07844V15.1259C2.3714 16.1531 3.19311 17 4.22024 17H12.7797C13.8068 17 14.6286 16.1531 14.6286 15.1259V9.07844C14.6249 8.13059 13.9402 7.34132 13.0032 7.2296ZM4.71039 4.53742H4.71399C4.71399 2.43269 6.41147 0.709985 8.49817 0.709985H8.50178C9.49287 0.706381 10.4443 1.09922 11.1471 1.79839C11.8787 2.52279 12.286 3.51028 12.2788 4.53742V7.2332H11.4859V4.53742C11.4931 3.71931 11.1687 2.93364 10.5885 2.35701C10.0407 1.8092 9.29826 1.49926 8.5234 1.49926H8.50178C6.84394 1.49926 5.50326 2.86156 5.50326 4.53381V7.2332H4.71039V4.53742ZM10.7687 4.53742V7.2332H6.22766V4.53742C6.22766 3.26161 7.24399 2.22366 8.50538 2.22366H8.52701C9.11085 2.22366 9.67307 2.45792 10.0875 2.87238C10.5272 3.31206 10.7759 3.91393 10.7687 4.53742ZM13.9402 15.1367C13.9402 15.7674 13.4284 16.2792 12.7977 16.2792H4.23466C3.60396 16.2792 3.0922 15.7674 3.0922 15.1367V9.09646C3.0922 8.46576 3.60396 7.954 4.23466 7.954H12.7977C13.4284 7.954 13.9402 8.46576 13.9402 9.09646V15.1367Z"
            fill="currentColor"
          />
          <path
            d="M9.74516 11.8933C9.58659 11.3347 9.07843 10.9526 8.49818 10.9526C7.78099 10.9526 7.19714 11.5329 7.19714 12.2537C7.19714 12.8339 7.57917 13.3421 8.13778 13.5007V14.5098C8.13778 14.708 8.29996 14.8702 8.49818 14.8702C8.6964 14.8702 8.85858 14.708 8.85858 14.5098V13.5007C9.54694 13.3024 9.94699 12.5816 9.74516 11.8933ZM8.49818 12.8303C8.17743 12.8303 7.91794 12.5708 7.91794 12.2501C7.91794 11.9293 8.17743 11.6698 8.49818 11.6698C8.81894 11.6698 9.07842 11.9293 9.07842 12.2501C9.07842 12.5708 8.81894 12.8303 8.49818 12.8303Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  if (name === "name") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.88599 7.70726C8.94482 7.70726 9.86157 7.3275 10.6108 6.57823C11.3599 5.82909 11.7397 4.91247 11.7397 3.85351C11.7397 2.79492 11.36 1.87817 10.6107 1.12878C9.86145 0.37976 8.9447 0 7.88599 0C6.82703 0 5.9104 0.37976 5.16125 1.1289C4.41211 1.87805 4.03223 2.79479 4.03223 3.85351C4.03223 4.91247 4.41211 5.82921 5.16125 6.57836C5.91064 7.32738 6.82739 7.70726 7.88599 7.70726ZM5.82434 1.79187C6.39917 1.21704 7.07349 0.93762 7.88599 0.93762C8.69836 0.93762 9.3728 1.21704 9.94775 1.79187C10.5226 2.36682 10.8021 3.04125 10.8021 3.85351C10.8021 4.66601 10.5226 5.34032 9.94775 5.91527C9.3728 6.49022 8.69836 6.76964 7.88599 6.76964C7.07373 6.76964 6.39941 6.4901 5.82434 5.91527C5.24939 5.34044 4.96985 4.66601 4.96985 3.85351C4.96985 3.04125 5.24939 2.36682 5.82434 1.79187Z"
            fill="currentColor"
          />
          <path
            d="M14.629 12.3031C14.6074 11.9913 14.5637 11.6512 14.4994 11.2921C14.4344 10.9303 14.3508 10.5883 14.2507 10.2756C14.1472 9.95251 14.0067 9.63342 13.8328 9.32763C13.6525 9.01025 13.4406 8.73388 13.2028 8.50647C12.9541 8.26855 12.6497 8.07727 12.2976 7.93774C11.9468 7.79895 11.558 7.72864 11.1421 7.72864C10.9788 7.72864 10.8208 7.79565 10.5157 7.99426C10.328 8.1167 10.1084 8.2583 9.86328 8.41492C9.65369 8.54846 9.36975 8.67358 9.01904 8.78686C8.67688 8.89758 8.32947 8.95373 7.98645 8.95373C7.64368 8.95373 7.29626 8.89758 6.95386 8.78686C6.60352 8.6737 6.31946 8.54858 6.11023 8.41504C5.86743 8.25989 5.64771 8.11829 5.45715 7.99414C5.15234 7.79553 4.99438 7.72852 4.83105 7.72852C4.41504 7.72852 4.02637 7.79895 3.67566 7.93787C3.32385 8.07715 3.01929 8.26843 2.77039 8.50659C2.53259 8.73413 2.32068 9.01037 2.1405 9.32763C1.9668 9.63342 1.82617 9.95239 1.72266 10.2758C1.62268 10.5884 1.53906 10.9303 1.47412 11.2921C1.40967 11.6507 1.36609 11.991 1.34448 12.3035C1.32324 12.609 1.3125 12.927 1.3125 13.2483C1.3125 14.0835 1.578 14.7596 2.10156 15.2583C2.61865 15.7504 3.30273 15.9999 4.13489 15.9999H11.839C12.6709 15.9999 13.355 15.7504 13.8722 15.2583C14.3959 14.76 14.6614 14.0836 14.6614 13.2482C14.6613 12.9258 14.6504 12.6078 14.629 12.3031ZM13.2257 14.579C12.884 14.9042 12.4304 15.0622 11.8389 15.0622H4.13489C3.54321 15.0622 3.0896 14.9042 2.74805 14.5791C2.41296 14.2601 2.25012 13.8247 2.25012 13.2483C2.25012 12.9485 2.26001 12.6525 2.27979 12.3683C2.29907 12.0895 2.3385 11.7832 2.39697 11.4578C2.45471 11.1363 2.5282 10.8347 2.6156 10.5616C2.69946 10.2998 2.81384 10.0405 2.95569 9.79077C3.09106 9.55273 3.24683 9.34851 3.4187 9.18396C3.57947 9.03003 3.7821 8.90405 4.02087 8.80957C4.2417 8.72217 4.48987 8.67431 4.75928 8.66711C4.79211 8.68457 4.85059 8.71789 4.94531 8.77966C5.13806 8.90527 5.36023 9.04858 5.60583 9.20544C5.88269 9.38195 6.23938 9.54138 6.66553 9.67895C7.1012 9.81982 7.54553 9.89135 7.98657 9.89135C8.42761 9.89135 8.87207 9.81982 9.3075 9.67907C9.73401 9.54126 10.0906 9.38195 10.3678 9.2052C10.6191 9.04455 10.8351 8.90539 11.0278 8.77966C11.1226 8.71802 11.181 8.68457 11.2139 8.66711C11.4834 8.67431 11.7316 8.72217 11.9525 8.80957C12.1912 8.90405 12.3938 9.03015 12.5546 9.18396C12.7264 9.34839 12.8822 9.55261 13.0176 9.79089C13.1595 10.0405 13.274 10.2999 13.3578 10.5615C13.4453 10.835 13.5189 11.1365 13.5765 11.4576C13.6349 11.7837 13.6744 12.0901 13.6937 12.3684V12.3686C13.7136 12.6517 13.7236 12.9476 13.7238 13.2483C13.7236 13.8248 13.5608 14.2601 13.2257 14.579Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }
  if (name === "open") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-arrow-bar-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
          />
        </svg>
      </div>
    );
  }
  if (name === "analyze") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-upload"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
        </svg>
      </div>
    );
  }
  if (name === "newDoc") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </div>
    );
  }
  if (name === "delete") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </div>
    );
  }
  if (name === "menu") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </svg>
      </div>
    );
  }
  if (name === "copy") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-clipboard"
          viewBox="0 0 16 16"
        >
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
        </svg>
      </div>
    );
  }
  if (name === "cross") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </div>
    );
  }
  if (name === "search") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>
    );
  }
  if (name === "google") {
    return (
      <div
        style={{
          color: color,
        }}
      >
        <svg
          width={width}
          height={height}
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
      </div>
    );
  }
};

export default Icons;
