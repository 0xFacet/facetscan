import { Block, Transaction, InternalTransaction } from "@/types/blocks";
import { DeployableContract } from "@/types/contracts";

export const fetchTotalBlocks = async () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/blocks/total`);
  const { result } = await fetch(url.href, { cache: "no-store" }).then((res) =>
    res.json()
  );
  return result as number;
};

export const fetchBlocks = async ({ page = 1, perPage = 20 } = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/blocks`);
  url.search = new URLSearchParams({
    page: `${page}`,
    per_page: `${perPage}`,
  }).toString();
  const { result } = await fetch(url.href, { cache: "no-store" }).then((res) =>
    res.json()
  );
  return result as Block[];
};

export const fetchBlock = async (blockNumber: string) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/blocks/${blockNumber}`
  );
  const { result } = await fetch(url.href, { cache: "no-store" }).then((res) =>
    res.json()
  );
  return result as Block;
};

export const fetchTotalTransactions = async () => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/transactions/total`
  );
  const { result } = await fetch(url.href, { cache: "no-store" }).then((res) =>
    res.json()
  );
  return result as number;
};

export const fetchTransactions = async ({
  page = 1,
  perPage = 20,
  block,
}: {
  page?: string | number;
  perPage?: string | number;
  block?: string | number;
} = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/transactions`);
  if (block) {
    url.search = new URLSearchParams({
      page: `${page}`,
      per_page: `${perPage}`,
      block_number: `${block}`,
    }).toString();
  } else {
    url.search = new URLSearchParams({
      page: `${page}`,
      per_page: `${perPage}`,
    }).toString();
  }
  const { result } = await fetch(url.href, { cache: "no-store" }).then((res) =>
    res.json()
  );
  return result as Transaction[];
};

export const fetchTransaction = async (txHash: string) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/transactions/${txHash}`
  );
  const { result } = await fetch(url.href, { cache: "no-store" }).then((res) =>
    res.json()
  );
  return result as Transaction;
};

export const fetchInternalTransactions = async (txHash: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/contract_calls`);
  url.search = new URLSearchParams({
    transaction_hash: txHash,
  }).toString();
  const { result } = await fetch(url.href, { cache: "no-store" }).then((res) =>
    res.json()
  );
  return result as InternalTransaction[];
};

export const fetchDeployableContracts = async () => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/contracts/allow-list-artifacts`
  );
  const { result } = await fetch(url.href, { cache: "no-store" }).then((res) =>
    res.json()
  );
  return result as DeployableContract[];
};
