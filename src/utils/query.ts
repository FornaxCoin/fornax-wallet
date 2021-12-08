import { gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  query TransactionsWithPagination(
    $offset: Int = 0
    $limit: Int = 10
    $sortBy: Sort
  ) {
    transactionsWithPagination(page: $offset, limit: $limit, sortBy: $sortBy) {
      paginator {
        slNo
        prev
        next
        perPage
        totalData
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
      }
      transactions {
        id
        transactionHash
        transactionIndex
        blockHash
        blockNumber
        from
        to
        gasUsed
        cumulativeGasUsed
        contractAddress
        status
        value
        nonce
        gasPrice
        logs {
          id
          logIndex
          transactionHash
          transactionIndex
        }
        logsBloom
        input
        createdAt
        updatedAt
        block {
          id
          size
          gasLimit
          gasUsed
          nonce
        }
        method {
          id
          hash
          name
          method
        }
        timestamp
      }
    }
  }
`;

const GET_TRANSACTIONS_BY_MONTH = gql`
  query TransactionsByMonth($address: String) {
    transactionsByMonth(address: $address) {
      fromCount
      fromTotal
      month
      toCount
      toTotal
    }
  }
`;

export { GET_TRANSACTIONS, GET_TRANSACTIONS_BY_MONTH };
