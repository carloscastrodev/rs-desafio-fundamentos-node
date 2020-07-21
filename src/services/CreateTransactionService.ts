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
    try {
      validTransaction.execute({
        value,
        balance: currentBalance,
        type,
      });
      return this.transactionsRepository.create({ title, value, type });
    } catch (err) {
      throw Error(err.message);
    }
  }
}

export default CreateTransactionService;
