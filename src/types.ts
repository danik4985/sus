export interface Token {
	type:    Type
	value:   string
	closed?: boolean
}

export enum Type {
	IdentifierName = 'IdentifierName',
	LineTerminatorSequence = 'LineTerminatorSequence',
	NumericLiteral = 'NumericLiteral',
	Punctuator = 'Punctuator',
	StringLiteral = 'StringLiteral',
	WhiteSpace = 'WhiteSpace'
}
