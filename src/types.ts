export type ModalProps = {
    show: boolean;
    onClose: () => void;
}
export type RuleGroupElement = {
    id: string;
    conjunction: 'AND' | 'OR';
    not: boolean;
}
export type RuleGroupProps = {
    ruleGroupId: string;
    removeRuleGroup: (ruleGroupId: string) => void;
    queryObjects: RuleGroupObject[];
    setQueryObjects: React.Dispatch<React.SetStateAction<RuleGroupObject[]>>;
}
export type RuleProps = {
    ruleId: string;
    deleteRule: any;
    rules?: any;
    setRules: any
}

export type RuleElement = {
    id: string;
    field: string | null;
    condition: string | null;
    value: any | null
}
export type SelectListProps = {
    list: string[];
    show: number;
    setShow: React.Dispatch<React.SetStateAction<number>>;
    update: (newVal: any, updateKey: number) => void;
    updateKey: number;
}

export type RuleGroupObject = {
    children?: (RuleGroupObject | RuleElement)[];
    conjunction?: 'AND' | 'OR';
    not?: boolean;
    id?: string;
}