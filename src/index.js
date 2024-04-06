import "./style.css";
import Webpack from "./assets/images/webpack-logo.png";

const container = document.querySelector("main");

const div = document.createElement("div");
div.className = "container";

const img = document.createElement("img");
img.className = "logo";
img.src = Webpack;

const p = document.createElement("p");
p.textContent = "Simple Webpack Template";

div.append(img, p);

container.appendChild(div);
