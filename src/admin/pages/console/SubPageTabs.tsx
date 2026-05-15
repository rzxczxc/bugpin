import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface SubTab {
  hash: string;
  label: string;
}

interface SubPageTabsProps {
  subTabs: SubTab[];
  defaultHash: string;
  children: React.ReactNode | React.ReactNode[];
}

function useActiveHash(validHashes: string[], defaultHash: string): string {
  const getHash = (): string => {
    const hash = window.location.hash.slice(1);
    return validHashes.includes(hash) ? hash : defaultHash;
  };
  const [activeHash, setActiveHash] = useState<string>(getHash);
  useEffect(() => {
    const handler = () => setActiveHash(getHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return activeHash;
}

export function SubPageTabs({ subTabs, defaultHash, children }: SubPageTabsProps) {
  const validHashes = subTabs.map((s) => s.hash);
  const activeHash = useActiveHash(validHashes, defaultHash);
  const childArray = Array.isArray(children) ? children : [children];

  const handleSubTabChange = (value: string) => {
    if (value === defaultHash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = value;
    }
  };

  return (
    <Tabs value={activeHash} onValueChange={handleSubTabChange}>
      <TabsList>
        {subTabs.map((subTab) => (
          <TabsTrigger key={subTab.hash} value={subTab.hash}>
            {subTab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {subTabs.map((subTab, index) => (
        <TabsContent key={subTab.hash} value={subTab.hash} className="mt-6">
          {childArray[index]}
        </TabsContent>
      ))}
    </Tabs>
  );
}
