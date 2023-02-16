import {useState} from "react"
import validboards from "./ValidBoards";

let ind = parseInt(Math.random()*10, 10)
let board = validboards[ind]
let moves = []

function Grid(){

    const [prev, Setboard] = useState(true)

    function sleep(ms){
        new Promise((resolve, reject)=>{
            setTimeout(resolve, ms)
        })
    }

    let grids = [];

    function check(x, y, val){
        for(let i = 0; i<9; i++){
            if(board[i][y] == val || board[x][i] == val){
                return false
            }
            if(board[(3*Math.floor(x/3))+Math.floor(i/3)][(3*Math.floor(y/3))+Math.floor(i%3)] == val){
                return false
            }
        }
        return true
    }


    function solver(){
        let chars = "123456789"
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(board[i][j] == ""){
                    for(let k = 0; k<9; k++){
                        if(check(i, j, chars[k]) == true){
                            board[i][j] = chars[k]
                            moves.push([i,j,chars[k]])
                            if(solver() == true){
                                return true;
                            }
                            board[i][j]=""
                            moves.push([i,j,""])
                        }
                    }
                    return false
                }
            }
        }
        return true
    }


    for(let i = 0; i < 9; i++){
        for(let j = 0; j<9; j++){
        grids.push(<div key={Math.random()*100000} className="pt-5 w-16 h-16 text-slate-200 bg-slate-800 m-1 text-xl text-center font-mono">{board[i][j]}</div>)
        }
    }


    return (
        <div className="flex justify-center mt-5">
            <div className="inline-grid grid-cols-9 gap-1">
                {grids}
            </div>
            <button className="ml-4 p-5" onClick = {()=>{solver()}}>Solve</button>
        </div>
    );
}

export default Grid