import * as core from '@actions/core';

class InputFactory {
	public cafeBranch(): string {
		return core.getInput('cafe_repo_branch', { required: true });
	}

	public baristaBranch(): string {
		return core.getInput('barista_repo_branch', { required: false });
	}

	public e2eBranch(): string {
		return core.getInput('e2e_tests_repo_branch', { required: true });
	}

	public skipTests(): boolean {
		return core.getBooleanInput('skip_tests', { required: false });
	}

	public gpgPassword(): string {
		return core.getInput('gpg_password', { required: false });
	}

	public gpgCipher(): string {
		return core.getInput('gpg_cipher', { required: false });
	}
}

export { InputFactory };
