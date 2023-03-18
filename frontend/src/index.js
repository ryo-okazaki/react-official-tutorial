import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// 正方形のマス目
/*
class Square extends React.Component {
    // stateを初期化
    constructor(props) {
        super(props);
        // jsのクラスでは、サブクラスのコンストラクタを定義する際は常にsuperを呼ぶ必要がある
        // constructorを持つReactのクラスコンポーネントでは、全てコンストラクタをsuper(props)の呼び出しから始めるべき
        this.state = {
            value: null,
        }
    }

    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
                // onClickプロパティはマス目がクリックされた時にSquareが呼び出すためのもの
                // Squareがクリックされると、Boardから渡されたonClick関数がコールされる

                // Squareのrenderメソッド内に書かれたonClickハンドラ内でthis.setStateを呼び出すことで、
                // Reactに<button>がクリックされたら常に再レンダーするよう伝えることができる

                // setStateをコンポーネント内で呼び出すと、Reactはその内部の子コンポーネントも自動的に更新する
            >
                {this.props.value}
            </button>
        );
    }
}
 */

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

// 盤面
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) return;

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
        // Boardのstateが変更されると、個々のSquareコンポーネントも自動的に再レンダーされる
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
                // 現在、どのマス目に何が入っているかを管理しているのはBoard
                // SquareがBoardのstateを更新できるようにする必要がある
                // stateはコンポーネント内でプライベートなものなので、SquareからBoardのstateを直接書き換えることはできない

                // 代わりに、BoardからSquareに関数を渡すことにして、マス目がクリックされた時にSquareにその関数を呼んでもらうようにする
            />
        );
        // propsとしてvalueという名前の値をSquareに渡すコードを変更
        // 親であるBoardコンポーネントから子であるSquareコンポーネントにpropsを渡す
        // Reactでは、親から子へとpropsを渡すことで、アプリ内に情報が流れる
    }

    render() {
        const winner = calculateWinner(this.state.squares);

        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}