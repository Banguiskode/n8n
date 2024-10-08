import { DataSource, In, Repository } from '@n8n/typeorm';
import { Service } from 'typedi';

import { ExecutionData } from '../entities/execution-data';

@Service()
export class ExecutionDataRepository extends Repository<ExecutionData> {
	constructor(dataSource: DataSource) {
		super(ExecutionData, dataSource.manager);
	}

	async findByExecutionIds(executionIds: string[]) {
		return await this.find({
			select: ['workflowData'],
			where: {
				executionId: In(executionIds),
			},
		}).then((executionData) => executionData.map(({ workflowData }) => workflowData));
	}
}
