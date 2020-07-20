interface TransactionDTO {
  value: number;
  balance: number;
  type: 'income' | 'outcome';
}

interface ValidateDTO {
  isValid: boolean;
  errorMessage?: string;
}

class ValidateTransactionService {
  private isTransactionValid: boolean;

  private errorMessage: string;

  constructor() {
    this.isTransactionValid = true;
    this.errorMessage = 'No error.';
  }

  public execute({ value, balance, type }: TransactionDTO): ValidateDTO {
    if (type !== 'outcome' && type !== 'income') {
      this.isTransactionValid = false;
      this.errorMessage = 'Invalid transaction type.';
    } else if (type === 'outcome' && balance < value) {
      this.isTransactionValid = false;
      this.errorMessage =
        "Doesn't have enough money in balance for this transaction.";
    } else {
      this.isTransactionValid = true;
      this.errorMessage = 'No error.';
    }
    return {
      isValid: this.isTransactionValid,
      errorMessage: this.errorMessage,
    };
  }
}

export default ValidateTransactionService;
