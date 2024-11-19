import React from "react";

function WeddingVideo() {
  return (
    <div>
      <div className="mx-auto grid w-11/12 grid-cols-5 items-center justify-center gap-7 lg:mt-20">
        <video className="!w-96" controls>
          <source src="movie.mp4" type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default WeddingVideo;
