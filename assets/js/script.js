const ballsContainer = document.querySelector(".balls")
const allBalls = document.getElementsByClassName("single-ball")
const btnBet = document.querySelector(".btn-bet")
const allBetsList = document.querySelector(".list")
const modal = document.querySelector(".modal")
let sorted = false
const numbers = [01 , 08 , 12 , 10 , 20 , 36 , 24 , 7 , 18 , 32 , 44 , 40 , 30 , 23 , 13]



numbers.forEach(element=>{
    ballsContainer.innerHTML += `
    <button class='single-ball' onclick='mark(this)'>${element}</button>
    `
})

let myBet = {}
let myBetNumbers = []
let allBetsArray = [
    
]
render()
function mark(target){
    if(target.className == "single-ball mark"){
        target.classList.remove("mark")
        const pos = myBetNumbers.indexOf(target.innerHTML)
        myBetNumbers.splice(pos,1)
        
    } else if(myBetNumbers.length < 4 && target.className != "single-ball mark"){
        myBetNumbers.push(target.innerHTML)
        target.classList.add("mark")
    }
}

// Criar minha aposta

btnBet.addEventListener("click" , (e)=>{
    e.preventDefault()
    if(allBetsArray.length > 99){
        cleanForm()
        openModal("error" , "Lista de apostas cheia")
        return
    }
    if(sorted){
        return
    }
    let name = document.querySelector("#name").value 
    let id = Math.random()*(10**18)
    if(!name || name==null || name.length < 2){
        document.querySelector("#name").value = ''
        openModal("error" , "Nome invalido")
        return
    }
    if(myBetNumbers.length < 4){
        openModal("error" , "Precisa de escolher 4 números")
        return
    }
    if(name && myBetNumbers.length == 4){
        myBet.name = name
        myBet.id = id
        myBet.bet = myBetNumbers
        myBet.points = 0
        allBetsArray.push(myBet)
        render()
        cleanForm()
        openModal("success" , "Aposta feita")
    }
})

function cleanForm(){
    myBet = {}
    myBetNumbers = []
    document.querySelector("#name").value = ''
    const cleanBalls = [...allBalls].forEach(element=>{
        element.classList.remove("mark")
    })
}

function render(){
    let numberOfBet = document.querySelector(".numberOfBet")
    allBetsList.innerHTML = ''
    allBetsArray.forEach(bet=>{
        allBetsList.innerHTML +=`
        <div class="single-bet">
            <p>Nome : ${bet.name}</p>
            <div class="card-bet">
                <span>${bet.bet[0]}</span>
                <span>${bet.bet[1]}</span>
                <span>${bet.bet[2]}</span>
                <span>${bet.bet[3]}</span>
            </div>
            <p class='singleId'>ID : ${bet.id}</p>
        </div>
        `
    })
    numberOfBet.textContent = allBetsArray.length
}


// Modal 

function openModal(state , msg){
    if(state == "error"){
        modal.style.background = "#933"
    } 

    if(state == "success"){
        modal.style.background = "#393"
    }

    modal.style.opacity = "1"
    document.querySelector(".msg").textContent = msg
    setTimeout(()=>{
        modal.style.opacity = "0"
    } , 2000)
}
// Apostas alertorias

const btnRandomBet = document.querySelector(".btn-random-bet")
let nameRandomList = ["Marcos" , "SocRam" , "Jonas" , "C'asta Inho" , "Messi" , "CR7" , "Neymar" , "Ibrahimovic" , "Pelé" , "Maradona",
"Michael Jackson" , "Elvis Presley" , "Avril" , "Madonna" , "Noctoriuos Big" , "Tupac" , "Eminem" , "Rihanna" , "Beyonce" , "Olivia Rodrigo",
"Sub-zero" , "Scorpion" , "Nigthwolf" , "Noob Saibot" , "Bill Gates" , "Steve Jobs" , "Bruce Lee" , "Jackie Chan" , "Jet Li" , "Michael Jordan" , 
"Bob Marley" , "Albert Einstein" , "Isaac Newton" , "Nikola Tesla" , "Marie Curie" , "Naruto" , "Sasuke" , "Sakura" , "Kazamatsuri" , "Mizuno" , "Shigeki",
"Hanon" , "Lucia" , "Rina" , "Ben Tennyson" , "Yugi Muto" , "Inuyasha" , "Kagome" , "Dante Vale" , "Zhali Moon" , "Sofia Casterwil" , "Loki Lambert" , "Loki",
"Peter Parker" , "Clark Kent" , "Bruce Wayne" , "Kara Danvers" , "Doutor Estranho",  "Hulk" , "Flash" , "Robin" , "Harley Quin" , "Steven Universe" , "Dark Magician",
"Deadpool", "Beethoven" , "Mozart" , "Vicent van Gogh"
]
console.log(nameRandomList.length)
btnRandomBet.addEventListener("click" , (e)=>{
    e.preventDefault()
    const numberOfBets = document.querySelector("#numberOfBets")
    let numberOfBetsValue = numberOfBets.value
    if(sorted){
        return
    }
    for(let i=0;i<numberOfBetsValue;i++){
        let myBet = {}
        let myBetNumbers = []
        let orderNumberRandom = []

        do {
            let num = Math.round(Math.random()*(numbers.length-1))
            if(orderNumberRandom.includes(num)){

            } else {
                orderNumberRandom.push(num)
            }
        } while (orderNumberRandom.length < 4);

        for(let a=0;a<4;a++){
            myBetNumbers.push(numbers[orderNumberRandom[a]])  
        }

        let id = Math.random()*(10**18)

       
        let numberRandom = Math.round(Math.random()*nameRandomList.length)
        if(numberRandom == nameRandomList.length){
            numberRandom = nameRandomList.length -1
        } 
        let name = nameRandomList[numberRandom]
        nameRandomList.splice(numberRandom,1)
        myBet.name = name == undefined ? console.log(numberRandom) : name 
        myBet.id = id
        myBet.bet = myBetNumbers
        myBet.points = 0
        allBetsArray.push(myBet)
        
        if(allBetsArray.length > 99){
            openModal("error" , "Lista de apostas cheia")
            return
        }
        openModal("success" , numberOfBetsValue+" apostas foram geradas" )
        render()
    }
   console.log(nameRandomList)
})



// Sortear

const btnSort = document.querySelector(".btn-sort")
const ballsWinner = document.querySelector(".ballsWinner")

btnSort.addEventListener("click" , ()=>{
    
    if(sorted){
        return
    }
    if(allBetsArray.length < 4){
        openModal("error" , "Precisa ter no minimo 4 apostas")
        return
    }
    sorted = true
    let winnerSort = []
    let orderNumberRandom = []

    do {
        let num = Math.round(Math.random()*(numbers.length-1))
        if(orderNumberRandom.includes(num)){

        } else {
            orderNumberRandom.push(num)
        }
    } while (orderNumberRandom.length < 4);

    for(let a=0;a<4;a++){
        winnerSort.push(numbers[orderNumberRandom[a]])  
    }
    
    let cont = 0
    var timeApear = setInterval(()=>{
        
        ballsWinner.innerHTML += `
            <span>${winnerSort[cont]}</span>
        `
        cont++
        if(cont >= 4){
            clearInterval(timeApear)
            verificationResults(winnerSort)
        } 
    } , 1000)

})

function verificationResults(results){
 let cont = 0
    allBetsList.innerHTML = ''
    allBetsArray.forEach(bet=>{
        allBetsList.innerHTML += `
            <div class="single-bet">
                <p>Nome : ${bet.name}</p>
                <div class="card-bet">
                    <span>${bet.bet[0]}</span>
                    <span>${bet.bet[1]}</span>
                    <span>${bet.bet[2]}</span>
                    <span>${bet.bet[3]}</span>
                </div>
                <p class='singleId'>ID : ${bet.id}</p>
            </div>
        `
        const singleBet = allBetsList.querySelectorAll(".single-bet")
        const card = singleBet[cont].querySelector(".card-bet")
        const ball = card.getElementsByTagName("span")
        let forElementSpan = 0
        const forEachBall = [...ball].forEach(element=>{
            for(let i=0;i<4;i++){
                if(element.innerHTML == results[i]){
                    element.style.background = "#c93"
                    bet.points += 35
                }
                if(element.innerHTML == results[i] && forElementSpan == i){
                    element.style.background = "#393"
                    bet.points += 65
                }
            }
            forElementSpan++
        })
       cont++ 
    })
    findWinner()
}

function findWinner(){
    let winner
    let pointsWinner = 0
    allBetsArray.forEach(bet=>{
        if(bet.points > pointsWinner){
            winner = bet
            pointsWinner = bet.points
        }
    })
    
    document.querySelector(".nameWinner").textContent = `${winner.name}`
    document.querySelector(".idWinner").textContent = `${winner.id}`
    document.querySelector(".pointsWinner").textContent = `${winner.points*allBetsArray.length} pontos`
    openModal("success" , "Sorteiro finalizado")
}

