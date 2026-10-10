const fun = (() => {
    const ascend = document.getElementById("ascend");
    const numbers = document.getElementById("numbers");
    const spin = document.getElementById("spin");
    const result = document.getElementById("result");
    const psl = document.getElementById("pslimg");
    
    let last=0;
    
    let as = parseInt(localStorage.getItem("as"), 10);
    last=as;
    if (isNaN(as)) {
        as = 10;
        localStorage.setItem("as", as);
    }
    
    
    function updateAscend() {
        ascend.textContent = "Твой Асценд: " + as;
    }
    function updatePSL() {
    let src;

    if (as <= 0) {
        src = "videos/sub1.jpg";
    } else if (as <= 200) {
        src = "videos/sub2.jpg";
    } else if (as <= 500) {
        src = "videos/sub3.jpg";
    } else if (as <= 1000) {
        src = "videos/sub4.jpg";
    } else if (as <= 1500) {
        src = "videos/sub5.jpg";
    } else if (as <= 2000) {
        src = "videos/ltn.jpg";
    } else if (as <= 3000) {
        src = "videos/mtn.jpg";
    } else if (as <= 5000) {
        src = "videos/htn.jpg";
    } else if (as <= 7000) {
        src = "videos/htn+.jpg";
    } else if (as <= 10000) {
        src = "videos/chadlught.jpg";
    } else if (as <= 15000) {
        src = "videos/chad.jpg";
    } else if (as <= 20000) {
        src = "videos/trueadam.jpg";
    } else if (as < 30000) {
        src = "videos/trueadam.jpg";
    } else {
        src = "videos/aboAdam.jpg";
    }

    
    function getLevel(value) {
        if (value <= 0) return 0;
        if (value <= 200) return 1;
        if (value <= 500) return 2;
        if (value <= 1000) return 3;
        if (value <= 1500) return 4;
        if (value <= 2000) return 5;
        if (value <= 3000) return 6;
        if (value <= 5000) return 7;
        if (value <= 7000) return 8;
        if (value <= 10000) return 9;
        if (value <= 15000) return 10;
        if (value <= 20000) return 11;
        if (value < 30000) return 12;
        return 13;
    }

    if (getLevel(as) > getLevel(last) && typeof confetti === "function") {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    psl.src = src;
}

updateAscend();
updatePSL();

   
    const possibleNumbers = [1, 5, 10, 25, 50, 100, 500,1000,5000,-20000,10000,30000, -1, -5, -10, -25, -50, -100, -500, -200];
    const totalItems = 100;

    for (let i = 0; i < totalItems; i++) {
        const el = document.createElement("div");
        el.className = "number";
        el.textContent =
            possibleNumbers[
                Math.floor(Math.random() * possibleNumbers.length)
            ];

        numbers.appendChild(el);
    }

    spin.addEventListener("click", () => {
        spin.disabled = true;

        if (window.goatcounter) {
        window.goatcounter.count({
            path: "roulette-spin",
            title: "Нажатие кнопки Крутить",
            event: true
        });
        }

        if (result) result.textContent = "Бонсмешим...";

        const winnerIndex = 70 + Math.floor(Math.random() * 20);
        const winnerElement = numbers.children[winnerIndex];

        const winningNumber = Number(winnerElement.textContent);

        numbers.style.transition = "none";
        numbers.style.transform = "translateX(0px)";

        requestAnimationFrame(() => {
            const roulette = numbers.closest(".roulette");
            const marker = roulette.querySelector(".marker");

            const markerRect = marker.getBoundingClientRect();
            const numberRect = winnerElement.getBoundingClientRect();

            const markerCenter =
                markerRect.left + markerRect.width / 2;

            const numberCenter =
                numberRect.left + numberRect.width / 2;

            const offset = markerCenter - numberCenter;

            numbers.style.transition =
                "transform 4s cubic-bezier(.12,.75,.15,1)";

            numbers.style.transform =
                `translateX(${offset}px)`;
        });

        setTimeout(() => {
            
            if (result) {
                result.textContent = winningNumber;
            }

            

            last = as;
            as += winningNumber;

            

            localStorage.setItem("as", as);

            updateAscend();
            updatePSL();
            spin.disabled = false;
        }, 4100);
        

    });
})();
