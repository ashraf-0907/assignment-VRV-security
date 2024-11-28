export enum ComparisionFilterKeyword {
    EQUAL = "$eq",
    GREATER_THAN = "$gt",
    GREATER_THAN_EQUAL = "$gte",
    IN = "$in",
    LESS_THAN = "$lt",
    LESS_THAN_EQUAL = "$lte",
    NOT_EQUAL = "$ne"
}

export enum LogicalFilterKeyword {
    AND = "$and",
    OR = "$or",
    NOT = "$not"
}
