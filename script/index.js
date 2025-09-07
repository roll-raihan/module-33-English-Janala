const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url) //promise of response
        .then(response => response.json())//promise of json
        .then(Data => {
            displayLessons(Data.data);
        })
};
//to remove 'active' from every btn
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons);
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();//remove all active cls
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(clickBtn);
            clickBtn.classList.add('active');//add active cls for particular btn
            displayLevelWord(data.data)
        });
};
//for word info if clicked on info btn
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
//for word info
const displayWordDetails = (word) => {
    // console.log(word);
    const detailsContainer = document.getElementById('details-container');
    //making dynamic for word info
    detailsContainer.innerHTML = `
    <div class="">
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonym</h2>
                    <span class="btn">Syn1</span>
                    <span class="btn">Syn1</span>
                    <span class="btn">Syn1</span>
                </div>
    
    `;
    document.getElementById("my_modal").showModal();
}
//for loadLevelWord
const displayLevelWord = (words) => {
    //1.
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    //if there is no word (lesson 4 & 7):
    if (words == 0) {
        wordContainer.innerHTML = `
        <div class="font-bangla text-center col-span-full rounded-xl py-10 space-y-6">
        <img src="./assets/alert-error.png" class="mx-auto">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    }
    //2.
    words.forEach(word => {
        // console.log(word);
        //3.
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>
            <h2 class="font-bangla font-medium text-xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারন পাওয়া যায়নি"}"</h2>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        //4.
        wordContainer.append(card);
    });
};
//for loadLessons
const displayLessons = (lessons) => {
    // 1.get the container and empty it
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2.get into every element
    for (let lesson of lessons) {
        // 3.create element
        // console.log(lesson)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no
            }" onclick="loadLevelWord(${lesson.level_no
            })" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no
            }</button>
        `;
        //4.append child
        levelContainer.append(btnDiv);
    }

}
loadLessons();