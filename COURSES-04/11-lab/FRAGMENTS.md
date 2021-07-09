```
query roots {
	__schema{
		queryType{
			...typeFields
		}
		mutationType {
			...typeFields
		}
			subscriptionType {
			...typeFields
		}
	}
}

fragment typeFields on __Type {
	name {
		fields{
			name
		}
	}
}

```
