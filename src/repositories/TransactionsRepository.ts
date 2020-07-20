import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface AllTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  private updateBalance(transaction: Omit<TransactionDTO, 'title'>): void {
    switch (transaction.type) {
      case 'income':
        this.balance.income += transaction.value;
        this.balance.total += transaction.value;
        break;
      case 'outcome':
        this.balance.outcome += transaction.value;
        this.balance.total -= transaction.value;
        break;
      default:
        throw Error('Unknown error.');
    }
  }

  public all(): AllTransactions {
    const { transactions } = this;
    const { balance } = this;
    return { transactions, balance };
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    try {
      this.updateBalance({ value, type });
      this.transactions.push(newTransaction);
    } catch (err) {
      throw Error(err.message);
    }

    return newTransaction;
  }
}

export default TransactionsRepository;
