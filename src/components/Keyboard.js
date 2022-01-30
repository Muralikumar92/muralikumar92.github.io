import React from 'react';
import { split } from '../util/languageUtil';

export class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { word: '' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(val) {
    if (!this.props.won) {
      if (val == 'enter') {
        //TODO handle not enouth letter
        if (split(this.state.word).length === this.props.wordLimit) {
          this.props.onKeyInput('enter');
          this.setState({ word: '' });
        }
      } else if (val == 'backSpace') {
        this.setState({
          word: this.state.word.substring(0, this.state.word.length - 1),
        });
        this.props.onKeyInput(
          this.state.word.substring(0, this.state.word.length - 1)
        );
      } else {
        let tempWord = this.state.word;
        tempWord = tempWord.concat(val);
        if (split(tempWord).length <= this.props.wordLimit) {
          let lastLetter = this.state.word.charAt(this.state.word.length - 1);
          this.setState({ word: this.state.word.concat(val) });
          this.props.onKeyInput(this.state.word.concat(val));
        }
      }
    }
  }

  render() {
    const selectedKeys = { க: 'green', ச: 'gray' };
    const map = {
      அ: '்',
      ஆ: 'ா',
      இ: 'ி',
      ஈ: 'ீ',
      உ: 'ு',
      ஊ: 'ூ',
      எ: 'ெ',
      ஏ: 'ே',
      ஐ: 'ை',
      ஒ: 'ொ',
      ஓ: 'ோ',
      ஔ: 'ௌ',
    };
    return (
      <div class="keyboard">
        <div>
          {['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ']
            .map((l) => {
              let lastLetter = this.state.word.charAt(
                this.state.word.length - 1
              );
              if (
                [
                  'க',
                  'ங',
                  'ச',
                  'ஞ',
                  'ட',
                  'ண',
                  'த',
                  'ந',
                  'ப',
                  'ம',
                  'ய',
                  'ர',
                  'ல',
                  'வ',
                  'ழ',
                  'ள',
                  'ற',
                  'ன',
                ].includes(lastLetter)
              ) {
                return lastLetter.concat(map[l]);
              } else {
                return l;
              }
              return l;
            })
            .map((l) => {
              return (
                <button
                  class="key"
                  keyState={selectedKeys[l]}
                  onClick={() => this.handleClick(l.charAt(l.length - 1))}
                >
                  {l}
                </button>
              );
            })}
        </div>
        <div>
          {['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய'].map((l) => {
            return (
              <button class="key" onClick={() => this.handleClick(l)}>
                {l}
              </button>
            );
          })}
        </div>
        <div>
          <button
            class="key enterKey"
            onClick={() => this.handleClick('enter')}
          >
            Enter
          </button>
          {['ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன', 'ஃ'].map((l) => {
            return (
              <button class="key" onClick={() => this.handleClick(l)}>
                {l}
              </button>
            );
          })}
          <button
            class="key backSpace"
            onClick={() => this.handleClick('backSpace')}
          >
            ⌫
          </button>
        </div>
      </div>
    );
  }
}