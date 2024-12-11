import TreeNode from '../TreeNode';
import Branch from './Branch';

export type ParentInfo = {
	parent: TreeNode;
	branch: Branch;
};

export enum ProccessStatuses {
	ADD,
	DELETE,
	FIND,
}
