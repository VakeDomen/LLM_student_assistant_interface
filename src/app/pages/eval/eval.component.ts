import { Component, OnInit } from '@angular/core';
import { HitNode, QueryObject } from 'src/app/models/evaluation.model';
import { EvalService } from 'src/app/services/eval.service';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrl: './eval.component.sass'
})
export class EvalComponent implements OnInit {

  public queryEval: QueryObject | undefined;
  public hits: HitNode[] | undefined;
  public hitScores: number[] | undefined;
  public answer: boolean | undefined;

  constructor(
    private evalService: EvalService,
  ) { }

  ngOnInit(): void {
    this.nextQuestion();
  }


  nextQuestion() {
    this.queryEval = undefined;
    this.hits = undefined;
    this.answer = undefined
    this.hitScores = undefined;


    this.evalService.getNext().subscribe((resp: QueryObject) => {
      console.log(resp);
      this.hits = resp.hit_nodes;
      this.hitScores = [];
      for (const hit of this.hits) {
        this.hitScores.push(-1);
      }
      this.queryEval = resp;
    })
  }


  hitsLeft() {
    return this.hitScores?.filter(h => h == -1).length;
  }

}

