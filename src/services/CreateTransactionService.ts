import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import ValidateTransactionService from './ValidateTransactionService';

const validTransaction = new ValidateTransactionService();
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const currentBalance = this.transactionsRepository.getBalance().total;
    const validateTransaction = validTransaction.execute({
      value,
      balance: currentBalance,
      type,
    });
    if (validateTransaction.isValid) {
      return this.transactionsRepository.create({ title, value, type });
    }
    throw Error(validateTransaction.errorMessage);
  }
}

export default CreateTransactionService;
