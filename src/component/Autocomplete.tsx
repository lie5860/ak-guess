import React, {useState, useRef, useEffect, useCallback} from 'react';
import {MAIN_KEY} from "../const";
import {filterDataByInputVal} from "../utils/autocomplete";

interface AutocompleteProps {
  chartsData: Character[];
  aliasData: Alias[];
  placeholder?: string;
  id?: string;
  onSubmit: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  chartsData,
  aliasData,
  placeholder,
  id = 'guess',
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Character[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 输入变化时计算匹配结果
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const trimmed = val.trim();
    if (!trimmed) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = filterDataByInputVal(trimmed, chartsData, aliasData);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setActiveSuggestionIndex(-1);
  }, [chartsData, aliasData]);

  // 选中某个建议项
  const onSuggestionClick = useCallback((name: string) => {
    setInputValue(name);
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  // 键盘导航
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev =>
        prev >= suggestions.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex > -1 && activeSuggestionIndex < suggestions.length) {
        e.preventDefault();
        const selectedName = suggestions[activeSuggestionIndex]?.[MAIN_KEY];
        setInputValue(selectedName);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }, [showSuggestions, suggestions, activeSuggestionIndex]);

  // 滚动活跃项到视口
  useEffect(() => {
    if (activeSuggestionIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[activeSuggestionIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({block: 'nearest'});
      }
    }
  }, [activeSuggestionIndex]);

  // 点击外部关闭建议列表
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(e.target as Node) &&
        listRef.current && !listRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // 暴露 getValue 和 clearValue 给父组件通过 ref
  const getValue = useCallback(() => inputValue, [inputValue]);
  const clearValue = useCallback(() => {
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  // 表单提交处理
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(inputValue);
  }, [inputValue, onSubmit]);

  return {
    inputValue,
    getValue,
    clearValue,
    handleSubmit,
    renderInput: () => (
      <div className="autocomplete">
        <input
          ref={inputRef}
          id={id}
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={listRef}
            id={`${id}autocomplete-list`}
            className="autocomplete-items"
          >
            {suggestions.map((item, index) => (
              <div
                key={item?.[MAIN_KEY] || index}
                className={index === activeSuggestionIndex ? 'autocomplete-active' : ''}
                onClick={() => onSuggestionClick(item?.[MAIN_KEY])}
              >
                {item?.[MAIN_KEY]}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
  };
};

// 自定义 Hook：提供给 Game 组件使用
export const useAutocomplete = (props: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Character[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const {chartsData, aliasData, placeholder, id = 'guess'} = props;

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const trimmed = val.trim();
    if (!trimmed) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = filterDataByInputVal(trimmed, chartsData, aliasData);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setActiveSuggestionIndex(-1);
  }, [chartsData, aliasData]);

  const onSuggestionClick = useCallback((name: string) => {
    setInputValue(name);
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev =>
        prev >= suggestions.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex > -1 && activeSuggestionIndex < suggestions.length) {
        e.preventDefault();
        const selectedName = suggestions[activeSuggestionIndex]?.[MAIN_KEY];
        setInputValue(selectedName);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }, [showSuggestions, suggestions, activeSuggestionIndex]);

  // 滚动活跃项到视口
  useEffect(() => {
    if (activeSuggestionIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[activeSuggestionIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({block: 'nearest'});
      }
    }
  }, [activeSuggestionIndex]);

  // 点击外部关闭建议列表
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(e.target as Node) &&
        listRef.current && !listRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return {
    inputValue,
    clearValue: () => {
      setInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);
    },
    renderInput: () => (
      <div className="autocomplete">
        <input
          ref={inputRef}
          id={id}
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={listRef}
            id={`${id}autocomplete-list`}
            className="autocomplete-items"
          >
            {suggestions.map((item, index) => (
              <div
                key={item?.[MAIN_KEY] || index}
                className={index === activeSuggestionIndex ? 'autocomplete-active' : ''}
                onClick={() => onSuggestionClick(item?.[MAIN_KEY])}
              >
                {item?.[MAIN_KEY]}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
  };
};

export default Autocomplete;
