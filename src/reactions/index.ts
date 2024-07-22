export const reactionLimit: number = 6

export class RecentReactions {
  public items: Array<string> = []

  constructor(items: Array<string>) {
    this.items = items
  }

  public size(): number {
    return this.items.length
  }

  public push(item: string): void {
    if (this.size() === reactionLimit) {
      this.items.pop()
    }
    this.items.unshift(item)
  }

  public pop(): string | undefined {
    return this.items.pop()
  }

  public swap(index: number): void {
    const temp = this.items.splice(index, 1)
    this.push(temp[0])
  }
}

export enum ReactionAction {
  REACT = 0,
  REMOVE = 1,
}

export interface Reaction {
  id: number;
  author: string;
  emoji: string;
  action: ReactionAction;
}

export type ReactionList = Record<
  string,
  {
    count: number;
    index: number;
    senders: Array<string>;
    you: boolean;
  }
>;

export type SortedReactionList = Array<
  [string, { count: number; index: number; senders: Array<string>; you?: boolean }]
>;

export interface OpenGroupReaction {
  index: number;
  count: number;
  you: boolean;
  reactors: Array<string>;
}

export type OpenGroupReactionList = Record<string, OpenGroupReaction>;

export interface OpenGroupReactionResponse {
  added?: boolean;
  removed?: boolean;
  seqno: number;
}
