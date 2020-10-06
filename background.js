(function () {
  "use strict";

  var canvas = document.getElementById("lines");
  var div = document.getElementById("experience");
  var context = canvas.getContext("2d");
  var color = "#ffffff";

  canvas.width = window.innerWidth * 1.75;
  canvas.height = window.innerHeight * 1.75;
  canvas.style.display = "block";

  context.fillStyle = color;
  context.strokeStyle = color;
  context.lineWidth = 0.4;

  var dots = {
    nb: 0.3 * Math.max(canvas.width, canvas.height),
    distance: Math.min(0.1 * Math.min(canvas.width, canvas.height), 75),
    d_radius: Math.min(0.05 * Math.min(canvas.width, canvas.height), 60),
    array: [],
  };

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    context.fillStyle = color;
    context.lineWidth = 0.4;
    context.strokeStyle = color;
    dots.nb = 0.3 * Math.max(canvas.width, canvas.height);
    dots.distance = Math.min(0.1 * Math.min(canvas.width, canvas.height), 75);
    dots.d_radius = Math.min(0.05 * Math.min(canvas.width, canvas.height), 60);
  });

  var dotsAnimation = function () {
    var mouseOnCanvas = false;
    var mousePosition = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    var magneticPoints = {
      p1: {
        x: canvas.width * Math.random(0.25, 0.75),
        y: canvas.height * Math.random(0.25, 0.75),
        vx: -0.5 + Math.random() * 3,
        vy: -0.5 + Math.random() * 3,
      },
      p2: {
        x: canvas.width * Math.random(0.25, 0.75),
        y: canvas.height * Math.random(0.25, 0.75),
        vx: -0.5 + Math.random() * 3,
        vy: -0.5 + Math.random() * 3,
      },
      p3: {
        x: canvas.width * Math.random(0.25, 0.75),
        y: canvas.height * Math.random(0.25, 0.75),
        vx: -0.5 + Math.random() * 3,
        vy: -0.5 + Math.random() * 3,
      },
    };

    function Dot() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (-0.5 + Math.random()) * 2;
      this.vy = (-0.5 + Math.random()) * 2;
      this.radius = Math.random() * 2.25;
    }

    Dot.prototype = {
      create: function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
      },
    };

    Dot.move = function () {
      var i, dot, point;

      for (i = 0; i < dots.nb; i++) {
        dot = dots.array[i];

        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx;
          dot.vy = -dot.vy;
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }

      for (point in magneticPoints) {
        dot = dots.array[i];

        if (
          magneticPoints[point].y < 0 ||
          magneticPoints[point].y > canvas.height
        ) {
          magneticPoints[point].vx = magneticPoints[point].vx;
          magneticPoints[point].vy = -magneticPoints[point].vy;
        } else if (
          magneticPoints[point].x < 0 ||
          magneticPoints[point].x > canvas.width
        ) {
          magneticPoints[point].vx = -magneticPoints[point].vx;
          magneticPoints[point].vy = magneticPoints[point].vy;
        }
        magneticPoints[point].x += magneticPoints[point].vx;
        magneticPoints[point].y += magneticPoints[point].vy;
      }
    };

    Dot.drawLines = function () {
      var i, j, i_dot, j_dot;
      var xCenterDistance, yCenterDistance;
      var xPointsDistance, yPointsDistance;

      for (i = 0; i < dots.nb; i++) {
        for (j = i + 1; j < dots.nb; j++) {
          i_dot = dots.array[i];
          j_dot = dots.array[j];

          if (mouseOnCanvas) {
            xCenterDistance = i_dot.x - mousePosition.x;
            yCenterDistance = i_dot.y - mousePosition.y;
            xPointsDistance = i_dot.x - j_dot.x;
            yPointsDistance = i_dot.y - j_dot.y;
            if (
              xCenterDistance < dots.d_radius &&
              yCenterDistance < dots.d_radius &&
              xCenterDistance > -dots.d_radius &&
              yCenterDistance > -dots.d_radius
            ) {
              if (
                xPointsDistance < dots.distance &&
                yPointsDistance < dots.distance &&
                xPointsDistance > -dots.distance &&
                yPointsDistance > -dots.distance
              ) {
                context.beginPath();
                context.moveTo(i_dot.x, i_dot.y);
                context.lineTo(j_dot.x, j_dot.y);
                context.stroke();
                context.closePath();
              }
            }
          }
          for (var point in magneticPoints) {
            xCenterDistance = i_dot.x - magneticPoints[point].x;
            yCenterDistance = i_dot.y - magneticPoints[point].y;
            xPointsDistance = i_dot.x - j_dot.x;
            yPointsDistance = i_dot.y - j_dot.y;
            if (
              xCenterDistance < dots.d_radius &&
              yCenterDistance < dots.d_radius &&
              xCenterDistance > -dots.d_radius &&
              xCenterDistance > -dots.d_radius
            ) {
              if (
                xPointsDistance < dots.distance &&
                yPointsDistance < dots.distance &&
                xPointsDistance > -dots.distance &&
                yPointsDistance > -dots.distance
              ) {
                context.beginPath();
                context.moveTo(i_dot.x, i_dot.y);
                context.lineTo(j_dot.x, j_dot.y);
                context.stroke();
                context.closePath();
              }
            }
          }
        }
      }
    };

    Dot.createDots = function () {
      var i;
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (dots.array.length < dots.nb) {
        for (i = 0; i < dots.nb; i++) {
          dots.array.push(new Dot());
        }
      }

      for (i = 0; i < dots.nb; i++) {
        var dot = dots.array[i];
        dot.create();
      }

      Dot.drawLines();
      Dot.move();
    };

    div.addEventListener("mousemove", function (e) {
      mouseOnCanvas = true;
      mousePosition.x = e.pageX * 2;
      mousePosition.y = e.pageY * 2;
    });

    div.addEventListener("mouseleave", function (e) {
      mouseOnCanvas = false;
    });

    setInterval(Dot.createDots, 100);
  };

  dotsAnimation();
})();
