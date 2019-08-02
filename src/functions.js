
// fazer no console do navegador  
//criar um array com valores crescentes array(15).fill(0)
//Array(15).fill(0).map((_,i) => i + 1)

//cria um array de array com as minas que serão personalizadas
const createBoard = (rows, columns)=>{
    return Array(rows).fill(0).map((_, row) => { //no map ele ignora o primeiro elemento _,  segundo parametro é o indice
        return Array(columns).fill(0).map((_,column) =>{
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })   
}
{/** espalha as minas no board */}
const spreadMines = (board, minesAmount)=> {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount){

    {/** seleciona linhas e colunas de forma aleatoria */}
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)
               
        {/** se não houver minas adiciona novas até a quantidade adicionada na var minesAmount*/}
        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}
{/** cria um tabuleiro minado */}
const createMinedBoard =(rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board /** o resultado sera passado para a função do arquivo minefield.s */
}

const cloneBoard = board =>{
    return board.map(rows =>{
        return rows.map(field=>{
            return { ...field}
        })
    })
}

//insere os vizinhos
const getNeighbors = (board, row, column) => {
    const neighbors =[]
    const rows = [row -1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c =>{ //verifica se na linha ou coluna existe um elemento diferente do que foi passado acima
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length //a linha não pode passar o tamanho do board o indice não pode ser negativo
            const validColumn = c >= 0 && c < board[0].length //mesmo pra coluna
            if (diferent && validRow && validColumn){
                //adiciona a const neighbors
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors // retorna os vizinhos
    
}
//verifica se a vizinhança é segura
const safeNeighborhood = (board, row, column) => {
    //saber se o vizinho não está minado, do contrario entrara na função reduc
    const safes = (result, neighbor) => result && !neighbor.mined
    //reduce verifica o array safes e retorna se está minado ou não
    return getNeighbors(board, row, column).reduce(safes,true)
}

//função para abrir o campo quando der um toque
//se a vizinha for segura o campo abre de forma recursiva (repetittiva)
const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened){
        field.openField = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {//abre os vizinhos
            //se a vizinha for segura ele chama o abrir campo de forma recursiva pra outros campos ao redor
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))
        } else { //caso a vizinhança não seja segura, pega a viznhança e calcula a qtd de linhas ao redor
            const neighbors = getNeighbors(board,row,column)
            field.nearMines = neighbors.filter(n=> n.mined).length// abre o campo e mostra a qtd de minas ao redor
        }

    }

}
                            //seve para percorrer toda a matriz //concat junta todos os arrays em um unico array
const fields = board => [].concat(...board)

//pra ssaber se o jogo terminou ou não
const hadExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0

//verfica se tem campos pendentes minados que não foram marcados com bandeira ou não minados e não abertos
const pendding = field => (field.mined && !field.flagged)
        || (!field.mined && !field.opened)

//verfica se o usuario ganhou o jogo
const wonGame = board => fields(!board).filter(pendding).length === 0

//mostra as minas
const showMines = board => fields(board).filter(field => field.mined) //pega todos os campos minados
    .forEach(field => field.open) //abrir todos os campos 

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines

}