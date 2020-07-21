interface TransactionDTO {
  value: number;
  balance: number;
  type: 'income' | 'outcome';
}

class ValidateTransactionService {
  public execute({ value, balance, type }: TransactionDTO): void {
    if (type !== 'outcome' && type !== 'income') {
      throw Error('Invalid transaction type.');
    } else if (type === 'outcome' && balance < value) {
      throw Error("Doesn't have enough money in balance for this transaction.");
    }
  }
}

export default ValidateTransactionService;
