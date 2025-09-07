const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url) //promise of response
        .then(response => response.json())//promise of json
        .then(Data => {
            displayLessons(Data.data);
        })
};
const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data));
}
//for loadLevelWord
const displayLevelWord = (words) => {
    //1.
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    //2.
    words.forEach(word => {
        // console.log(word);
        //3.
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronunciation</p>
            <h2 class="font-bangla font-medium text-xl">"${word.meaning} / ${word.pronunciation}"</h2>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        //4.
        wordContainer.append(card);
    });
}
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
        <button onclick="loadLevelWord(${lesson.level_no
            })" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no
            }</button>
        `;
        //4.append child
        levelContainer.append(btnDiv);
    }

}
loadLessons();