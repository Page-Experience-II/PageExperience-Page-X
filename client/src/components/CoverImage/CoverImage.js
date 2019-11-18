// import React from "react";
// import "./CoverImage.scss";

// const coverPictureDrag = () => {
//   $(document).ready(function() {
//     var img = $(".picture-container img");
//     var y1 = $(".picture-container").height();
//     var y2 = img.height();
//     var x1 = $(".picture-container").width();
//     var x2 = img.width();
//     var desktop_start_x = 0;
//     var desktop_start_y = 0;
//     var mobile_start_x = -200;
//     var mobile_start_y = -200;
//     $(".save").click(function(event) {
//       event.preventDefault();
//       var t = img.position().top,
//         l = img.position().left;
//       img.attr("data-top", t);
//       img.attr("data-left", l);
//       img.draggable({ disabled: true });
//     });
//     $(".pos").click(function(event) {
//       event.preventDefault();
//       img.draggable({
//         disabled: false,
//         scroll: false,
//         axis: "y, x",
//         cursor: "move",
//         drag: function(event, ui) {
//           if (ui.position.top >= 0) {
//             ui.position.top = 0;
//           }
//           if (ui.position.top <= y1 - y2) {
//             ui.position.top = y1 - y2;
//           }
//           if (ui.position.left >= 0) {
//             ui.position.left = 0;
//           }
//           if (ui.position.left <= x1 - x2) {
//             ui.position.left = x1 - x2;
//           }
//         }
//       });
//     });
//   });
// };
// const CoverImage = ({ src }) => {
//   return (
//     <div className="picture-container">
//       <img src={src} alt="CoverImage" />
//     </div>
//   );
// };

// export default CoverImage;
